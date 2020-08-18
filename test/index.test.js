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

    it("cli fromSeed", () => {
        let {seed} =  Wallet.cli.generateSeed()
        console.log(seed.toString("hex"))
    })

    it("fromBase58", () => {
        let {base58} = hdAddress.base58.getRandomBase58()
        let wallet = Wallet.fromBase58(base58, "ETH")
        let ehtWallet = wallet.derive("m/0/11/1")
        let foo = ehtWallet.getAll()
        console.log(foo)
    })

    it("cli base58", () => {
        let {base58} =  Wallet.cli.generateBase58()
        console.log(base58)
    })

    it("cli generateAddress ", () => {
        let option = {mnemonic: "aa", coin: "BTC", columns: "pri,path", index: 4, hdpath: "m/20'/0/"}
        let foo = Wallet.cli.generateAddress(option)
        console.log(foo)
    })

    it("cli generateAddress index",()=>{
        let options = {
            coin: 'BTC',
            mnemonic: undefined,
            seed: '8dca899dab01d432cf60e7ac9848962da69718391b2aba39cf765253b84b2ce60b12e76a0101e48a5123b5ffcaef41f8223922aa8bb205abdfb4e762b9b1410a',
            base58: undefined,
            index: "10",
            range: "",
            path: "m/0'/0/",
            columns: 'path,pri,pub'
        }
        let foo = Wallet.cli.generateAddress(options)
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


