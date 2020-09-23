let hdAddress = require('hd-address');

let cli = require("./lib/cli");

class Wallet {
    constructor(hd, hdpath = '') {
        this.__hdwallet = hd
        this.__hdpath = hdpath
    }

    getAll() {
        return this.__hdwallet.getAddressByPath(this.__hdpath)
    }

    hdpath() {
        return this.getAll().path
    }

    getAddress() {
        return this.getAll().address
    }

    getPublicKey() {
        return this.getAll().pub
    }

    getPrivateKey() {
        return this.getAll().pri
    }

    derive(hdpath) {
        if (typeof hdpath === undefined) return this
        const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
        if (/^[0-9]+'?$/.test(hdpath)) {
            hdpath = `/${hdpath}`
        }
        clone.__hdpath = this.__hdpath + hdpath
        return clone
    }
}

const HDWallet = {
    cli,
    fromMnemonic: (mnemonic, coin, pwd) => {
        let wallet = hdAddress.HD(mnemonic, hdAddress.keyType.mnemonic,pwd)
        return new Wallet(wallet[coin])
    },
    fromSeed: (seed, coin, pwd) => {
        let seedBuf = Buffer.from(seed, "hex")
        let wallet = hdAddress.HD(seedBuf, hdAddress.keyType.seed, pwd)
        return new Wallet(wallet[coin])
    },
    fromBase58: (base58, coin, pwd) => {
        let wallet = hdAddress.HD(base58, hdAddress.keyType.base58, pwd)
        return new Wallet(wallet[coin])
    }
}

module.exports = HDWallet