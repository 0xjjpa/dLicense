import Bundlr from '@bundlr-network/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type BalanceDataResponse = {
  response?: string
  err?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<BalanceDataResponse | string>) {
  const {
    method,
    body: { secret },
  } = req

  if (method != 'POST') return res.status(405).json({ err: 'Only POST method allowed.' })

  const adminPrivateKey = process.env.BUNDLR_PRIVATE_KEY;
  if (!adminPrivateKey) return res.status(500).json({ err: 'Server does not have loaded a Bundlr private key.' })
  const bundlr = new Bundlr("http://devnet.bundlr.network", "matic", adminPrivateKey, {
    providerUrl: "https://rpc-mumbai.maticvigil.com",
  });
//   const tx = await bundlr.upload(fileReaderStream(file), {
//     tags: [
//       { name: "Content-Type", value: file.type },
//       {
//         name: "License",
//         value: "yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8",
//       },
//       { name: "License-Fee", value: "One-Time-1" },
//       { name: "Currency", value: "MATIC" },
//       {
//         name: "Payment-Address", 
//         value: "$address" 
//       }      
//     ],
//   })

  return res.status(200).json({ response: "ok" })
}