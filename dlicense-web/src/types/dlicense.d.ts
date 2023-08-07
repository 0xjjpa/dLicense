export type dLicenseUDL = "Title" | "Content-Type" | "App-Name" | "License" | "License-Fee" | "Currency" | "Payment-Address";

export type dLicenseTagUDL = {
  name: dLicenseUDL,
  value: string,
}

export type dLicenseApp = {
  node: {
    id: string,
    tags: dLicenseTagUDL[]
  }
}

export type GraphQLApps = {
  data: {
    transactions: {
      edges: dLicenseApp[]
    }
  }
}