import Bundlr from '@bundlr-network/client'
import { privateKeyToAccount } from 'viem/accounts'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createPublicClient, formatEther, http } from 'viem'
import { polygon } from 'viem/chains'

type BalanceDataResponse = {
  balance?: {
    bundlr: string,
    native: string,
  }
  address?: string
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
  const bundlr = new Bundlr(process.env.BUNDLR_NODE_ENDPOINT, "matic", adminPrivateKey, {
    providerUrl: process.env.BUNDLR_RPC_ENDPOINT,
  });

  const account = privateKeyToAccount(adminPrivateKey as `0x${string}`)
  const client = createPublicClient({
    chain: polygon,
    transport: http(),
  })
  const nativeBalance = await client.getBalance({ address: account.address })
  const atomicBalance = await bundlr.getLoadedBalance();
  const bundlrBalance = bundlr.utils.fromAtomic(atomicBalance).toString();

  return res.status(200).json({ address: account.address, balance: { bundlr: bundlrBalance, native: formatEther(nativeBalance) } })
}