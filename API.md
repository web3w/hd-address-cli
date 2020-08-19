
## API Use Case
```bash
npm install hd-address-cli
```

**1.Creating a new HD wallet from a mnemonic:** [example](https://github.com/gisvr/hd-address-example/blob/master/cli/create.wallet.js)

```js
const HDWallet = require('hd-address-cli')

const mnemonic = 'tag volcano eight thank tide danger coast health above argue embrace heavy'
const hdwallet = HDWallet.fromMnemonic(mnemonic)
console.log(`${hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`) // 0xc49926c4124cee1cba0ea94ea31a6c12318df947
```

**2.Creating a new HD wallet from a seed:**[example](https://github.com/gisvr/hd-address-example/blob/master/cli/create.wallet.js)

```js
const seed = Buffer.from('efea201152e37883bdabf10b28fdac9c146f80d2e161a544a7079d2ecc4e65948a0d74e47e924f26bf35aaee72b24eb210386bcb1deda70ded202a2b7d1a8c2e', 'hex')
const ethSeedSWallet= HDWallet.fromSeed(seed,"ETH")
console.log(ethSeedSWallet.derive(`m/0'/0/1`).getAddress()) // 0x8230645aC28A4EdD1b0B53E7Cd8019744E9dD559
```

**3.Creating a new HD wallet from at a base58:**[example](https://github.com/gisvr/hd-address-example/blob/master/cli/create.wallet.js)

```js
const {base58} =HDWallet.cli.generateBase58({})
const ethBase58SWallet= HDWallet.fromBase58(base58,"ETH")
console.log(ethBase58SWallet.derive(`m/0'/0/1`).getAddress())
```
**4.Deriving keys at a HD path:**[example](https://github.com/gisvr/hd-address-example/blob/master/cli/getaddress.js)

```js
//026005c86a6718f66221713a77073c41291cc3abbfcd03aa4955e9b2b50dbf7f9b // compression public key
console.log(hdwallet.derive(`m/0'/0/0`).getPublicKey())
//63e21d10fd50155dbba0e7d3f7431a400b84b4c2ac1ee38872f82448fe3ecfb9
console.log(hdwallet.derive(`m/0'/0/0`).getPrivateKey()) 
console.log(hdwallet.derive(`m/0'/0/0`).hdpath())
```
**5.Deriving wallets given account index:** [example](https://github.com/gisvr/hd-address-example/blob/master/cli/getaddress.js)

```js
let hd = hdwallet.derive(`m/0'/0`)
console.log(hd.derive(1).getAddress()) // 0x8230645aC28A4EdD1b0B53E7Cd8019744E9dD559
console.log(hd.derive(2).getAddress()) // 0x65c150B7eF3B1adbB9cB2b8041C892b15eDde05A
console.log(hd.derive(2).hdpath())
```