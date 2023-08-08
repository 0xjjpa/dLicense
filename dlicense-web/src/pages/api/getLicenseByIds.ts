import type { NextApiRequest, NextApiResponse } from 'next'
import { NodeKwil } from 'kwil'
import { KwilDataResponse, KwilSoftwareQuery } from '../../types/kwil'
import { KWIL_SOFTWARE_DATABASE_ID } from '../../constants/kwil'


export default async function handler(req: NextApiRequest, res: NextApiResponse<KwilDataResponse | string>) {
  const {
    method,
    body: { address, softwareId }
  } = req

  if (method != 'POST') return res.status(405).json({ err: 'Only POST method allowed.' })

  const kwil = new NodeKwil({
    kwilProvider: "https://provider.kwil.com",
  });

  const response = await kwil.selectQuery(KWIL_SOFTWARE_DATABASE_ID, `SELECT * FROM licenses WHERE software_id = '${softwareId}' AND licensee_address = '${address}';`) as KwilSoftwareQuery
  return res.status(200).json({ response })
}