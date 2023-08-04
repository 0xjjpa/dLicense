import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";

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
      fileSize: 5 * 1024 * 1024, // 5MB
      fieldSize: 2 * 1024 * 1024  // 2MB
    },
    storage: multer.memoryStorage()
  }).single('file'));

  apiRoute.post<ExtendedRequest>(async (req, res) => {
    console.log(req.file); // Your file here
    console.log(req.body); // Your form data here

    // Any logic with your data here
    try {
      const bufferArray = req.file.buffer;
      console.log("BUFFER ARRAY", bufferArray);

      res.status(200).json({ response: 'ok' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  return apiRoute(req, res);
}
