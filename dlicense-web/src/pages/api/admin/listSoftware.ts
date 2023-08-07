import type { NextApiRequest, NextApiResponse } from 'next'
import { NodeKwil } from 'kwil'
import { KwilDataResponse, KwilSoftwareQuery } from '../../../types/kwil'
import { KWIL_SOFTWARE_DATABASE_ID } from '../../../constants/kwil'


export default async function handler(req: NextApiRequest, res: NextApiResponse<KwilDataResponse | string>) {
  const {
    method,
    body: { secret },
  } = req

  if (method != 'POST') return res.status(405).json({ err: 'Only POST method allowed.' })
  if (!secret) return res.status(401).json({ err: 'A secret is needed to call this endpoint.' })
  if (secret != process.env.API_ENDPOINT_SECRET) return res.status(401).json({ err: 'The passed secret is invalid' })

  const kwil = new NodeKwil({
    kwilProvider: "https://provider.kwil.com",
  });

  const response = await kwil.selectQuery(KWIL_SOFTWARE_DATABASE_ID, "SELECT * FROM software") as KwilSoftwareQuery
  return res.status(200).json({ response })
}