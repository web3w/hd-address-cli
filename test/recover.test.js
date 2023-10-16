import hdAddress from 'hd-address';
import { fromMnemonic } from '../index';

describe("hd-address-cli recover", () => {
    it("fromMnemonic", () => {
        let wallet = fromMnemonic("puppy employ science describe smart youth ivory danger title museum skate crawl", "TRX")
        let ehtWallet00 = wallet.derive("m/0/0/0")
        let foo00 = ehtWallet00.getAll()
        console.log(foo00)

        let ehtWallet02 = wallet.derive("m/0/0/2")
        let foo02 = ehtWallet02.getAll()
        console.log(foo02)

        let ehtWallet03 = wallet.derive("m/0/0/3")
        let foo03 = ehtWallet03.getAll()
        console.log(foo03)

        let ehtWallet10 = wallet.derive("m/0/1/0")
        let foo10 = ehtWallet10.getAll()
        console.log(foo10)

        let ehtWallet01 = wallet.derive("m/0/0/1")
        let foo01 = ehtWallet01.getAll()

        console.log(foo01)

        let ehtWallet11 = wallet.derive("m/0/1/1")
        let foo11 = ehtWallet11.getAll()

        console.log(foo11)
    })
})