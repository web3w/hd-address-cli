import { seed as _seed, base58 as _base58 } from 'hd-address';
import { fromMnemonic, fromSeed, cli, fromBase58 } from '../index';

describe("hd-address-cli index", () => {
    it("fromMnemonic", () => {
        let wallet = fromMnemonic("start", "ETH")
        let ehtWallet = wallet.derive("m/0/11/1")
        let foo = ehtWallet.getAll()
        console.log(foo)
    })

    it("fromSeed", () => {
        let {seed} = _seed.getRandomSeed()
        let seedBuf = Buffer.from(seed, "hex")
        let wallet = fromSeed(seedBuf, "ETH")
        let ehtWallet = wallet.derive("m/0/11/1")
        let foo = ehtWallet.getAll()
        console.log(foo)
    })

    it("cli fromSeed", () => {
        let {seed} =  cli.generateSeed()
        console.log(seed.toString("hex"))
    })

    it("fromBase58", () => {
        let {base58} = _base58.getRandomBase58()
        let wallet = fromBase58(base58, "ETH")
        let ehtWallet = wallet.derive("m/0/11/1")
        let foo = ehtWallet.getAll()
        console.log(foo)
    })

    it("cli base58", () => {
        let {base58} =  cli.generateBase58()
        console.log(base58)
    })

    it("cli generateAddress ", () => {
        let option = {mnemonic: "aa", coin: "BTC", columns: "pri,path", index: 4, hdpath: "m/20'/0/"}
        let foo = cli.generateAddress(option)
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
        let foo = cli.generateAddress(options)
        console.log(foo)
    })

    it("cli generateAddress default", () => {
        let option = {mnemonic: "aa", coin: "BTC",columns: "pri,path",index:1}
        let foo = cli.generateAddress(option)
        console.log(foo)
    })

    it("cli generateAddress range", () => {
        let option = {mnemonic: "aa", coin: "ETH", columns: "pri,path",range:"4-10", hdpath: "m/20'/0/"}
        let foo = cli.generateAddress(option)
        console.log(foo)
    })


    it("cli generateMnemonic", () => {
        let foo = cli.generateMnemonic()
        console.log(foo)
    })

    it("cli generateMnemonic CN", () => {
        let foo = cli.generateMnemonic({lang: "CN"})
        console.log(foo)
    })


    it("cli generateSeed", () => {
        let foo = cli.generateSeed()
        console.log(foo.seed.toString("hex"))
    })


    it("cli generateBase58", () => {
        let foo = cli.generateBase58()
        console.log(foo.base58.toString("hex"))
    })

})


