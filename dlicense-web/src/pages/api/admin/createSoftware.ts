import type { NextApiRequest, NextApiResponse } from 'next'
import { NodeKwil, Utils } from 'kwil'
import { KwilActionQuery, KwilTxResponse } from '../../../types/kwil'
import { KWIL_SOFTWARE_DATABASE_ID } from '../../../constants/kwil'
import { Wallet } from 'ethers'
import { randomUUID } from 'crypto'

export default async function handler(req: NextApiRequest, res: NextApiResponse<KwilTxResponse | string>) {
  const {
    method,
    body: { secret, name, description, address }
  } = req

  if (method != 'POST') return res.status(405).json({ err: 'Only POST method allowed.' })
  if (!secret) return res.status(401).json({ err: 'A secret is needed to call this endpoint.' })
  if (secret != process.env.API_ENDPOINT_SECRET) return res.status(401).json({ err: 'The passed secret is invalid' })

  const adminPrivateKey = process.env.BUNDLR_PRIVATE_KEY;
  if (!adminPrivateKey) return res.status(500).json({ err: 'Server does not have loaded a Bundlr private key.' })

  const wallet = new Wallet(adminPrivateKey);

  const kwil = new NodeKwil({
    kwilProvider: "https://provider.kwil.com",
  });


  const input = new Utils.ActionInput()
    .put("$software_id", randomUUID())
    .put("$name", name)
    .put("$description", description)
    .put("$price", 1)
    .put("$payment_address", address)


  const actionTx = await kwil
    .actionBuilder()
    .dbid(KWIL_SOFTWARE_DATABASE_ID)
    .name("create_software")
    .concat(input)
    .signer(wallet)
    .buildTx()

  const response = await kwil.broadcast(actionTx) as KwilActionQuery
  console.log("Response", response);


  return res.status(200).json({ response })
}