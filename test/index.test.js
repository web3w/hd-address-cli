let hdAddress = require('hd-address');
let Wallet = require('../index')

describe("hd-address-cli index", () => {
    it("fromMnemonic", () => {
        let wallet = Wallet.fromMnemonic("start", "ETH")
        let ehtWallet = wallet.derive("m/0/11/1")
        let foo = ehtWallet.getAll()
        console.log(foo)
    })

    it("fromSeed", () => {
        let {seed} = hdAddress.seed.getRandomSeed()
        let seedBuf = Buffer.from(seed, "hex")
        let wallet = Wallet.fromSeed(seedBuf, "ETH")
        let ehtWallet = wallet.derive("m/0/11/1")
        let foo = ehtWallet.getAll()
        console.log(foo)
    })

    it("fromBase58", () => {
        let {base58} = hdAddress.base58.getRandomBase58()
        let wallet = Wallet.fromBase58(base58, "ETH")
        let ehtWallet = wallet.derive("m/0/11/1")
        let foo = ehtWallet.getAll()
        console.log(foo)
    })

    it("cli generateAddress", () => {
        let option = {mnemonic: "aa", coin: "BTC", columns: "pri,path", index: 4, hdpath: "m/20'/0/"}
        let foo = Wallet.cli.generateAddress(option)
        console.log(foo)
    })

    it("cli generateAddress default", () => {
        let option = {mnemonic: "aa", coin: "BTC",columns: "pri,path"}
        let foo = Wallet.cli.generateAddress(option)
        console.log(foo)
    })

    it("cli generateAddress range", () => {
        let option = {mnemonic: "aa", coin: "ETH", columns: "pri,path",range:"4-10", hdpath: "m/20'/0/"}
        let foo = Wallet.cli.generateAddress(option)
        console.log(foo)
    })


    it("cli generateMnemonic", () => {
        let foo = Wallet.cli.generateMnemonic({lang: "CN"})
        console.log(foo)
    })


    it("cli generateSeed", () => {
        let foo = Wallet.cli.generateSeed({})
        console.log(foo.seed.toString("hex"))
    })


    it("cli generateBase58", () => {
        let foo = Wallet.cli.generateBase58({})
        console.log(foo.base58.toString("hex"))
    })
})


