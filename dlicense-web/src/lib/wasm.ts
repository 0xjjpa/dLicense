export const validateKey = async ({ address, signature }: { address: string, signature: string }): Promise<string> => {
  return new Promise((res) => {
    window.validateLicenseKey(address, signature, (response) => {
      console.log("Response", response);
      res(response);
    })
  })
}