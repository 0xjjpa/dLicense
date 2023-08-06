require('dotenv').config();
var Wallet = require('ethereumjs-wallet').default;
var hdkey = require('hdkey');
var bip39 = require('bip39');
var ethUtil = require('ethereumjs-util');

var mnemonic = process.env.MNEMONIC;
var seed = bip39.mnemonicToSeedSync(mnemonic);
var root = hdkey.fromMasterSeed(seed);

var path = "m/44'/60'/0'/0/0";
var addrNode = root.derive(path);
var wallet = Wallet.fromPrivateKey(addrNode._privateKey);

console.log("Private Key:", wallet.getPrivateKeyString());
console.log("Account Address:", wallet.getAddressString());

// Message to be signed
var message = "Access request to library";
var messageBuffer = Buffer.from(message);

// Hashing the message
var messageHash = ethUtil.hashPersonalMessage(messageBuffer);

// Signing the hash
var signature = ethUtil.ecsign(messageHash, addrNode._privateKey);

// Concatenating r, s, v values to form the signature
var signatureHex = ethUtil.toRpcSig(signature.v, signature.r, signature.s);

console.log("Message:", message);
console.log("Signature:", signatureHex);
