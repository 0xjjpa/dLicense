import type { NextApiRequest, NextApiResponse } from 'next'
import { Wallet } from 'ethers'
import { buySoftware } from '../../../lib/kwil'
import { KwilTxResponse } from '../../../types/kwil'


export default async function handler(req: NextApiRequest, res: NextApiResponse<KwilTxResponse | string>) {
  const {
    method,
    body: { secret, softwareId, transactionHash, address }
  } = req

  if (method != 'POST') return res.status(405).json({ err: 'Only POST method allowed.' })
  if (!secret) return res.status(401).json({ err: 'A secret is needed to call this endpoint.' })
  if (secret != process.env.API_ENDPOINT_SECRET) return res.status(401).json({ err: 'The passed secret is invalid' })

  const adminPrivateKey = process.env.BUNDLR_PRIVATE_KEY;
  if (!adminPrivateKey) return res.status(500).json({ err: 'Server does not have loaded a Bundlr private key.' })

  const wallet = new Wallet(adminPrivateKey);
  const response = await buySoftware({ softwareId, transactionHash, address, wallet });
  
  console.log("Response", response);

  return res.status(200).json({ response })
}