import wallet from "../index.js"
const mnemonic = 'tag volcano eight thank tide danger coast health above argue embrace heavy'
debugger
const hdwallet = wallet.fromMnemonic(mnemonic,"BTC")
debugger
const chain = hdwallet.derive(`m/0'/0/0`)
console.log(hdwallet.derive(`m/0'/0/0`).getAddress())  

let p2pkh = await chain.getAddress(hdIndex)
let p2wpkh = await chain.getNativeSegwitAddress(hdIndex)
let p2sh_p2wpkh = await chain.getNestedSegwitAddress(hdIndex)
let p2tr = await chain.getTopRootAddress(hdIndex)
debugger


console.log(hdwallet.derive(`m/0'/0/0`).get())  

//026005c86a6718f66221713a77073c41291cc3abbfcd03aa4955e9b2b50dbf7f9b // compression public key
console.log(hdwallet.derive(`m/0'/0/0`).getPublicKey())
console.log(hdwallet.derive(`m/0'/0/0`).getPrivateKey()) //63e21d10fd50155dbba0e7d3f7431a400b84b4c2ac1ee38872f82448fe3ecfb9
console.log(hdwallet.derive(`m/0'/0/0`).hdpath())
 