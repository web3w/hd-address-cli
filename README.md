# hd-address-cli


[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/miguelmota/ethereum-hdwallet/master/LICENSE)   [![NPM version](https://img.shields.io/npm/v/hd-address-cli?style=flat-square)](https://www.npmjs.com/package/hd-address-cli)
 >CLI and Node.js library for  HD Wallet derivations from mnemonic,seed


## CLI

### Install

```bash
    $ npm install hd-address-cli -g
```

### Usage
#### Generate mnemonic:
```bash
   $ hd_address_cli mnemonic
   $ hd_address_cli mnemonic -l CN -s mid15
   $ hd_address_cli mnemonic -l JA -s mid18
   $ hd_address_cli mnemonic -l EN -s high
```

#### Generate seed and base58:
```bash
   $ hd_address_cli base58
   $ hd_address_cli seed -s mid15 
```

#### Helper
```bash
$ hd_address_cli -h
 
Usage: hd_address_cli <cmd> [args]

Commands:
  hd_address_cli mnemonic [strength,lang]  Generate random mnemonic
  hd_address_cli seed [strength]           Generate random seed
  hd_address_cli base58 [strength]         Generate random base58

Options:
  -c, --coin      coin name (e.g.
                  BTC,BCH,LTC,ETH,TRX,BTC_TEST,BCH_TEST,LTC_TEST)
                                            [string] [required] [default: "BTC"]
  -i, --index     Account Index (e.g. 6)                                [number]
  -l, --columns   Columns to display (e.g. pub,pri,path)                [string]
  -r, --range     Account Index Range (e.g 1-100)     [string] [default: "1-10"]
  -m, --mnemonic  Mnemonic                                              [string]
  -s, --seed      Seed in hex format                                    [string]
  -b, --base58    Base58 format                                         [string]
  -p, --path      HD Path                                               [string]
  -v, --version   Show version number                                  [boolean]
  -h, --help      Show help                                            [boolean]

Examples:
  hd_address_cli -c "BTC" -m "tag volcano eight thank tide" -l pri


``` 

### Examples

Display the address at a particular account index:

```bash
$ hd_address_cli -c BTC -m "tag volcano eight thank tide danger coast health above argue embrace heavy" -i 4
    
    account address
    ┌─────────┬──────────────────────────────────────┬───────┬───────┐
    │ (index) │               address                │ coin  │ index │
    ├─────────┼──────────────────────────────────────┼───────┼───────┤
    │    0    │ '19d4qTx2Lzkq5nuBYqwMn3swQGbe8GMEB3' │ 'BTC' │   4   │
    └─────────┴──────────────────────────────────────┴───────┴───────┘
```

Display the account address derived from a range of account indexes:

```bash
$ hd_address_cli -c "ETH" -m "tag volcano eight thank tide danger coast health above argue embrace heavy" -r 5-10

    ┌─────────┬──────────────────────────────────────────────┬───────┬───────┐
    │ (index) │                   address                    │ coin  │ index │
    ├─────────┼──────────────────────────────────────────────┼───────┼───────┤
    │    0    │ '0x8c7f1ecea37e0e417dd0bcfA04b9126bCd519E2D' │ 'ETH' │   5   │
    │    1    │ '0x4518EDBE22288D2A353a77dBA10726aC06109aa8' │ 'ETH' │   6   │
    │    2    │ '0x6cA7296E2a9A72060513F282a43557C10bB447FC' │ 'ETH' │   7   │
    │    3    │ '0xB39D5530A5Df35e3A110d2c00Daf9d7bbBa1A502' │ 'ETH' │   8   │
    │    4    │ '0x20648Aece94410F2E3A8f9dF59d7b29Dd7Cbf825' │ 'ETH' │   9   │
    │    5    │ '0xffA71a7face390cfD8fA71b1Dd04F77eaFAa5C6c' │ 'ETH' │  10   │
    └─────────┴──────────────────────────────────────────────┴───────┴───────┘
```

Display the private keys of accounts:

```bash
$ hd_address_cli -c "TRX" -m "tag volcano eight thank tide danger coast health above argue embrace heavy" -r 5-10 -l pri

    ┌─────────┬──────────────────────────────────────┬────────────────────────────────────────────────────────────────────┬───────┬───────┐
    │ (index) │               address                │                                pri                                 │ coin  │ index │
    ├─────────┼──────────────────────────────────────┼────────────────────────────────────────────────────────────────────┼───────┼───────┤
    │    0    │ 'TFKPFK8rQXG75hKjvPcLuMU7duRD5Z3JX1' │ 'acfc5662fbac8aea7bf3eeb9c6ee8a2c188fbe76336b2bc83444734827afec0a' │ 'TRX' │   5   │
    │    1    │ 'TE8Gnnot8sDcyytxYsuwFuU4owq94zRg4x' │ 'e2e4cc77e0fed2d4a764f796342ccc22241aa9f5b90f5b39bb4080ee5462a910' │ 'TRX' │   6   │
    │    2    │ 'TY4H5iAnwJLVNAjUgGz4cd4h4cbT8LbsSS' │ '2f36c469e0d8579a1ab4fa9f927db274f21b8be2fc558f8a9fe2701765b954ec' │ 'TRX' │   7   │
    │    3    │ 'TQuhbGn3Ex7zQCLWhDJw8k9aDPBJ2rZ7Sn' │ '055e71ac0d4b89c7fc1f5b53291578389e690d37bbf09a2e0b8f4f4c76e947e9' │ 'TRX' │   8   │
    │    4    │ 'THb6YEqbpQwg84wL3EyEXP5zmp9YUxrcyS' │ 'c837155977f9489f9b23d510b4622529abf2191bc9d67cc2f27127dcb432ced1' │ 'TRX' │   9   │
    │    5    │ 'TCVVDB1MsiQXJHE1z72eykKWTK3wuL6Jr3' │ '0f5f852bf11b369d09b1755eff426ea4f89cf42b89e8f9a01987558dee713aa2' │ 'TRX' │  10   │
    └─────────┴──────────────────────────────────────┴────────────────────────────────────────────────────────────────────┴───────┴───────┘

```

Display the HD path of the account:

```bash
$ hd_address_cli -c ETH -m "tag volcano eight thank tide danger coast health above argue embrace heavy" -i 3 -l path

    account hd path
    ┌─────────┬──────────────────────────────────────────────┬────────────────────┬───────┬───────┐
    │ (index) │                   address                    │        path        │ coin  │ index │
    ├─────────┼──────────────────────────────────────────────┼────────────────────┼───────┼───────┤
    │    0    │ '0x5A9C156ba5297a573986BE25C468c01284E93512' │ "m/44'/60'/1'/0/3" │ 'ETH' │   3   │
    └─────────┴──────────────────────────────────────────────┴────────────────────┴───────┴───────┘

```

Use a custom HD path:

```bash
$ hd_address_cli -c ETH -m "tag volcano eight thank tide danger coast health above argue embrace heavy" -p "m/20'/0/" -l path,pri -r 0-3

    ┌─────────┬──────────────────────────────────────────────┬─────────────────────┬────────────────────────────────────────────────────────────────────┬───────┬───────┐
    │ (index) │                   address                    │        path         │                                pri                                 │ coin  │ index │
    ├─────────┼──────────────────────────────────────────────┼─────────────────────┼────────────────────────────────────────────────────────────────────┼───────┼───────┤
    │    0    │ '0xBa59F66B853f1ACB242bcC57ef188754Fc79434b' │ "m/44'/60'/20'/0/0" │ 'a4a7e3e62839dd97c5abfde41c635fa71a00dc5a69c5a0324c8759108701329d' │ 'ETH' │   0   │
    │    1    │ '0xbf4cFeb783b913c0eD1710f00e9AE1844D597c86' │ "m/44'/60'/20'/0/1" │ '93221ffcd3dea9816ec7b6f69f34ab5f7dc1bd3d0be19a3da395d929bdea8238' │ 'ETH' │   1   │
    │    2    │ '0x62b6ffac78674392e0c30eC042636E22907FbCD2' │ "m/44'/60'/20'/0/2" │ '8fc1b1839cd9e5901f534bf22a385c9b78907aa3e417399e140e10f9c0231b38' │ 'ETH' │   2   │
    │    3    │ '0xce8bf9293cF5C4e9EcB50Aa8F9E42adF568ae356' │ "m/44'/60'/20'/0/3" │ '93b1302f88019cfd120f83677274447ae76112be7e31b6aee59928fbb9a12584' │ 'ETH' │   3   │
    └─────────┴──────────────────────────────────────────────┴─────────────────────┴────────────────────────────────────────────────────────────────────┴───────┴───────┘

Display multiple columns:

```bash
$ hd_address_cli -c BTC -m "tag volcano eight thank tide danger coast health above argue embrace heavy" -l "pri,path" -r 0-2

    ┌─────────┬──────────────────────────────────────┬───────────────────┬────────────────────────────────────────────────────────────────────┬───────┬───────┐
    │ (index) │               address                │       path        │                                pri                                 │ coin  │ index │
    ├─────────┼──────────────────────────────────────┼───────────────────┼────────────────────────────────────────────────────────────────────┼───────┼───────┤
    │    0    │ '1LKrREbJ6RVckGMFVCxsXSLWrrvG8U7owQ' │ "m/44'/0'/1'/0/0" │ '4923e84b81af6edc3203587eed7075c89563e83bf44b2496a1b0fb8579a0584b' │ 'BTC' │   0   │
    │    1    │ '19vd1joP63XzfxSLyA9XMF6ArbhRYwvues' │ "m/44'/0'/1'/0/1" │ 'ab81bfbd4741d69dc6f867556dd022c97bd11baeb02e2bdc33011b69a4c1909b' │ 'BTC' │   1   │
    │    2    │ '14G5AvVQmauXP6idrS9pGx2TT27xgo9MY1' │ "m/44'/0'/1'/0/2" │ '44c3bc65f21661f8fdeb37e49826e78a0c10a2c5b8864bb293e41826cad87e32' │ 'BTC' │   2   │
    └─────────┴──────────────────────────────────────┴───────────────────┴────────────────────────────────────────────────────────────────────┴───────┴───────┘

```

Pipe mnemonic:

```bash
$ echo "tag volcano eight thank tide danger coast health above argue embrace heavy"  | hd_address_cli -c BTC -i 0
$ echo xprv9s21ZrQH143K4LNZvyv81JjVubcS891ij8CCEA4Bax159a4btLcz1qaHPRm2yr3bWawDX7B8gzAP6rVwY3BorBeWMYcsehtCzkMXA7nJB3g | hd_address_cli -b -c ETH


    ┌─────────┬──────────────────────────────────────┬───────┬───────┐
    │ (index) │               address                │ coin  │ index │
    ├─────────┼──────────────────────────────────────┼───────┼───────┤
    │    0    │ '1LKrREbJ6RVckGMFVCxsXSLWrrvG8U7owQ' │ 'BTC' │   0   │
    └─────────┴──────────────────────────────────────┴───────┴───────┘

```

## Require
```bash
npm install hd-address-cli
```

Creating a new HD wallet from a mnemonic:

```js
const HDWallet = require('hd-address-cli')

const mnemonic = 'tag volcano eight thank tide danger coast health above argue embrace heavy'
const hdwallet = HDWallet.fromMnemonic(mnemonic)
console.log(`${hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`) // 0xc49926c4124cee1cba0ea94ea31a6c12318df947
```

Creating a new HD wallet from a seed:

```js
const seed = Buffer.from('efea201152e37883bdabf10b28fdac9c146f80d2e161a544a7079d2ecc4e65948a0d74e47e924f26bf35aaee72b24eb210386bcb1deda70ded202a2b7d1a8c2e', 'hex')
const ethSeedSWallet= HDWallet.fromSeed(seed,"ETH")
console.log(ethSeedSWallet.derive(`m/0'/0/1`).getAddress()) // 0x8230645aC28A4EdD1b0B53E7Cd8019744E9dD559
```

Creating a new HD wallet from at a base58:

```js
const {base58} =HDWallet.cli.generateBase58({})
const ethBase58SWallet= HDWallet.fromBase58(base58,"ETH")
console.log(ethBase58SWallet.derive(`m/0'/0/1`).getAddress())
```

Deriving keys at a HD path:

```js
//026005c86a6718f66221713a77073c41291cc3abbfcd03aa4955e9b2b50dbf7f9b // compression public key
console.log(hdwallet.derive(`m/0'/0/0`).getPublicKey())
//63e21d10fd50155dbba0e7d3f7431a400b84b4c2ac1ee38872f82448fe3ecfb9
console.log(hdwallet.derive(`m/0'/0/0`).getPrivateKey()) 
console.log(hdwallet.derive(`m/0'/0/0`).hdpath())
```



Deriving wallets given account index:

```js
let hd = hdwallet.derive(`m/0'/0`)
console.log(hd.derive(1).getAddress()) // 0x8230645aC28A4EdD1b0B53E7Cd8019744E9dD559
console.log(hd.derive(2).getAddress()) // 0x65c150B7eF3B1adbB9cB2b8041C892b15eDde05A
console.log(hd.derive(2).hdpath())
```

## Test

```bash
npm test
```

## License

[MIT](LICENSE)
