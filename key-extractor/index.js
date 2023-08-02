require('dotenv').config()
var Wallet = require('ethereumjs-wallet').default;
var hdkey = require('hdkey');
var bip39 = require('bip39');

var mnemonic = process.env.MNEMONIC;
var seed = bip39.mnemonicToSeedSync(mnemonic);
var root = hdkey.fromMasterSeed(seed);

var path = "m/44'/60'/0'/0/0";
var addrNode = root.derive(path);
var wallet = Wallet.fromPrivateKey(addrNode._privateKey);

console.log("Private Key:", wallet.getPrivateKeyString());
console.log("Account Address:", wallet.getAddressString());
