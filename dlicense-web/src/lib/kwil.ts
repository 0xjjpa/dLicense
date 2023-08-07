import { NodeKwil, Utils } from 'kwil'
import { KwilActionQuery } from '../types/kwil'
import { KWIL_SOFTWARE_DATABASE_ID } from '../constants/kwil'
import { Wallet } from 'ethers'

export const createSoftware = async ({ softwareId, name, address, wallet }: { softwareId: string, name: string, address: string, wallet: Wallet }): Promise<KwilActionQuery> => {
  const kwil = new NodeKwil({
    kwilProvider: "https://provider.kwil.com",
  });

  const input = new Utils.ActionInput()
    .put("$software_id", softwareId)
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

export const buySoftware = async ({ licenseId, softwareId, transactionHash, address, wallet }: { licenseId: string, softwareId: string, transactionHash: string, address: string, wallet: Wallet }): Promise<KwilActionQuery> => {
  const kwil = new NodeKwil({
    kwilProvider: "https://provider.kwil.com",
  });

  const input = new Utils.ActionInput()
    .put("$license_id", licenseId)
    .put("$software_id", softwareId)
    .put("$transaction_hash", transactionHash)
    .put("$licensee_address", address)


  const actionTx = await kwil
    .actionBuilder()
    .dbid(KWIL_SOFTWARE_DATABASE_ID)
    .name("buy_software")
    .concat(input)
    .signer(wallet)
    .buildTx()

  return await kwil.broadcast(actionTx) as KwilActionQuery
}