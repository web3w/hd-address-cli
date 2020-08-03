'use strict';

let hdAddress = require('hd-address');

let getRange = (index, range) => {
    let start = 1;
    let end = 10;

    if (index != undefined) {
        start = index;
        if (start < 0) {
            start = 0;
        }
        end = start + 1;
        if (end < 0) {
            end = start + 1;
        }
        if (start > end) {
            end = start + 1;
        }
        if (end < start) {
            end = start + 1;
        }
    } else if (range) {
        let parts = range.split('-');
        start = parts[0] | 0;
        end = (parts[1] | 0) + 1;
        if (start < 0) {
            start = 0;
        }
        if (end < 0) {
            end = start + 1;
        }
        if (start > end) {
            end = start + 1;
        }
        if (end < start) {
            end = start + 10;
        }
        if (start > end) {
            start = 0;
        }
    }
    return {start, end}
}

module.exports = {
    generateMnemonic: (options) => {
        let {lang, strength} = options
        let _strength = hdAddress.mnemonic.strength[strength]
        let wordlist = hdAddress.mnemonic.wordLists[lang]
        let mnemonic = hdAddress.mnemonic.getRandomMnemonic(_strength, wordlist)
        console.info(`Mnemonic  strength ${strength} (${_strength}) lang ${lang} `)
        console.info("-------------------------start------------------------\n")
        console.info(mnemonic)
        console.info("\n--------------------------end-------------------------\n")
    },
    generateAddress: (options) => {
        let {coin, mnemonic, seed, base58, index, range, path, columns} = options
        if (!mnemonic && !seed && !base58) {
            console.error('Error: mnemonic, seed, base58 is required');
            return;
        }
        if (!coin) {
            console.error('Error: coin is required');
            return;
        }

        let hdwallet
        if (seed) {
            hdwallet = hdAddress.HD(Buffer.from(seed, 'hex'), hdAddress.keyType.seed)[coin]
        } else if (mnemonic) {
            hdwallet = hdAddress.HD(mnemonic)[coin];
        }

        let {start, end} = getRange(index, range)
        let addressList = []
        for (let i = start; i < end; i++) {

            let wallet = path ? hdwallet.getAddressByPath(path + i) : hdwallet.getCoinAddressKeyPair(i);

            if (!columns || !columns.split(",").includes("pri")) {
                delete wallet.pri
            }

            if (!columns || !columns.split(",").includes("pub")) {
                delete wallet.pub
            }

            if (!columns || !columns.split(",").includes("path")) {
                delete wallet.path
            }
            wallet.coin = coin
            wallet.index = i

            addressList.push(wallet)
        }
        console.table(addressList)
    }
}
