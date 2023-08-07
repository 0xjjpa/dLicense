export type KwilSoftware = {
  id: string
  name: string
  description: string
  price: string
  payment_address: string
  developer_address: string
}

export type KwilSoftwareQuery = {
  status: number
  data: KwilSoftware[]
}

export type KwilTxReceipt = {
  txHash: string
  fee: string
  body: string
}

export type KwilActionQuery = {
  status: number
  data: KwilTxReceipt
}

export type KwilTxResponse = {
  response?: KwilActionQuery
  err?: string
}

export type KwilDataResponse = {
  response?: KwilSoftwareQuery
  err?: string
}