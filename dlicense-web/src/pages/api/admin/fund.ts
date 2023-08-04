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
  if (!secret) return res.status(401).json({ err: 'A secret is needed to call this endpoint.' })
  if (secret != process.env.API_ENDPOINT_SECRET) return res.status(401).json({ err: 'The passed secret is invalid' })

  const adminPrivateKey = process.env.BUNDLR_PRIVATE_KEY;
  if (!adminPrivateKey) return res.status(500).json({ err: 'Server does not have loaded a Bundlr private key.' })
  const bundlr = new Bundlr("http://devnet.bundlr.network", "matic", adminPrivateKey, {
    providerUrl: "https://rpc-mumbai.maticvigil.com",
  });
  
  const response = await bundlr.fund(bundlr.utils.toAtomic('0.1'));

  return res.status(200).json({ response: response.id })
}