import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import Bundlr from "@bundlr-network/client";
import { Wallet } from 'ethers'

import { createSoftware } from "../../lib/kwil";
import { BUNDLR_DLICENSE_APP_ENVIRONMENT } from "../../constants/bundlr";


interface ExtendedRequest {
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
  };
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
      console.error("An error occurred:", error);
      res.status(501).json({ error: `Sorry something happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
    },
  });

  apiRoute.use(multer({
    limits: {
      fileSize: 20 * 1024 * 1024, // 20MB
      fieldSize: 2 * 1024 * 1024  // 2MB
    },
    storage: multer.memoryStorage()
  }).single('file'));

  apiRoute.post<ExtendedRequest>(async (req, res) => {

    const { address, name } = req.body;

    try {
      const bufferArray = req.file.buffer;

      if (!address) return res.status(400).json({ err: 'The request did not include a payment address.' })
      if (!name) return res.status(400).json({ err: 'The request did not include a name for the binary.' })
      if (!req.file) return res.status(400).json({ err: 'The request did not include a fiel to upload.' })

      const adminPrivateKey = process.env.BUNDLR_PRIVATE_KEY;
      if (!adminPrivateKey) return res.status(500).json({ err: 'Server does not have loaded a Bundlr private key.' })
      const bundlr = new Bundlr(process.env.BUNDLR_NODE_ENDPOINT, "matic", adminPrivateKey, {
        providerUrl: process.env.BUNDLR_RPC_ENDPOINT,
      });

      const wallet = new Wallet(adminPrivateKey);

      const bundlrTx = await bundlr.uploadWithReceipt(bufferArray, {
        tags: [
          { name: "Title", value: name },
          { name: "Content-Type", value: req.file.mimetype },
          { name: "App-Name", value: "dLicense" },
          { name: "App-Environment", value: BUNDLR_DLICENSE_APP_ENVIRONMENT },
          {
            name: "License",
            value: "yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8",
          },
          { name: "License-Fee", value: "One-Time-1" },
          { name: "Currency", value: "MATIC" },
          {
            name: "Payment-Address",
            value: address
          }
        ],
      })
      console.log("Bundlr Tx", bundlrTx);

      const softwareId = bundlrTx.id
      const kwiltx = await createSoftware({ softwareId, name, address, wallet, });
      console.log('Kwil Tx', kwiltx);

      res.status(201).json({ response: bundlrTx.id });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  return apiRoute(req, res);
}
