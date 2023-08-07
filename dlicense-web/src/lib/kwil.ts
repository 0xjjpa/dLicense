import { NodeKwil, Utils } from 'kwil'
import { KwilActionQuery } from '../types/kwil'
import { KWIL_SOFTWARE_DATABASE_ID } from '../constants/kwil'
import { randomUUID } from 'crypto'
import { Wallet } from 'ethers'

export const createSoftware = async ({ name, address, wallet }: { name: string, address: string, wallet: Wallet  }): Promise<KwilActionQuery> => {
  const kwil = new NodeKwil({
    kwilProvider: "https://provider.kwil.com",
  });

  const input = new Utils.ActionInput()
    .put("$software_id", randomUUID())
    .put("$name", name)
    .put("$description", "Placeholder description")
    .put("$price", 1)
    .put("$payment_address", address)


  const actionTx = await kwil
    .actionBuilder()
    .dbid(KWIL_SOFTWARE_DATABASE_ID)
    .name("create_software")
    .concat(input)
    .signer(wallet)
    .buildTx()

  return await kwil.broadcast(actionTx) as KwilActionQuery
}