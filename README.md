# dLicense
A decentralised license-issuer registry to provide license-keys to WASM-based binaries

# User flow - Posterity Cam

1. As a computer vision developer, I want to be able to get paid for filters I create.
    Go to filters.posterity.cam => Uploade to Arweave + UDL your WASM filter.
    The UDL will include the developer deposit address

2. As a user, I want to be able to take pictures, filter them, and uploade them forever.
    Go to posterity.cam, and connect your web3 wallet.
    Buy access to posterity.cam by sending the defined amount in the UDL license.
    A webhook gets notified about the payment and updates the database with the address.
    To use the WASM filter then a signature is generated.
    The WASM filter checks the signature against the database, and process if the address is in there.