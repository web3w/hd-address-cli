'use strict';

import hdAddress from 'hd-address'; 
debugger

const getRange = (index, range) => {
    let start = 1;
    let end = 10;

    if (index) {
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
    return { start, end }
}

export function generateMnemonic(options) {
    let { lang, strength, $0 } = options || {};
    strength = strength || "low";
    lang = lang || "EN";
    let _strength = hdAddress.mnemonic.strength[strength];
    let wordlist = hdAddress.mnemonic.wordLists[lang];
    let mnemonic = hdAddress.mnemonic.getRandomMnemonic(_strength, wordlist);
    if ($0) {
        console.info(`Mnemonic  strength ${strength} (${_strength}) lang ${lang} `);
        console.info("-------------------------start------------------------\n");
        console.info(mnemonic);
        console.info("\n--------------------------end-------------------------\n");
    } else {
        return mnemonic;
    }
}
export function generateBase58(options) {
    let { strength, $0 } = options || {};
    strength = strength || "low";
    let _strength = hdAddress.mnemonic.strength[strength];
    let base58 = hdAddress.base58.getRandomBase58(_strength);
    if ($0) {
        console.info(`base58  strength ${strength} (${_strength})`);
        console.info("-------------------------start------------------------\n");
        console.info(base58.base58);
        console.info("\n--------------------------end-------------------------\n");
    } else {
        return base58;
    }
}
export function generateSeed(options) {
    let { strength, $0 } = options || {};
    strength = strength || "low";
    let _strength = hdAddress.mnemonic.strength[strength];
    let seed = hdAddress.seed.getRandomSeed(_strength);
    if ($0) {
        console.info(`Seed  strength ${strength} (${_strength}) `);
        console.info("-------------------------start------------------------\n");
        console.info(seed.seed.toString("hex"));
        console.info("\n--------------------------end-------------------------\n");
    } else {
        return seed;
    }
}
export function generateAddress(options) {
    let { coin, mnemonic, seed, base58, index, range, path, columns, $0 } = options;
    if (!mnemonic && !seed && !base58) {
        console.error('Error: mnemonic, seed, base58 is required');
        return;
    }
    if (!coin) {
        console.error('Error: coin is required');
        return;
    }

    let hdwallet;
    if (seed) {
        hdwallet = hdAddress.HD(Buffer.from(seed, 'hex'), hdAddress.keyType.seed)[coin];
    } else if (mnemonic) {
        hdwallet = hdAddress.HD(mnemonic)[coin];
    } else if (base58) {
        hdwallet = hdAddress.HD(base58, hdAddress.keyType.base58)[coin];
    }

    let { start, end } = getRange(Number(index), range);
    let addressList = [];
    for (let i = start; i < end; i++) {
        let wallet = path ? hdwallet.getAddressByPath(path + i) : hdwallet.getCoinAddressKeyPair(i);
        if (!columns || !columns.split(",").includes("pri")) {
            delete wallet.pri;
        }

        if (!columns || !columns.split(",").includes("pub")) {
            delete wallet.pub;
        }

        if (!columns || !columns.split(",").includes("path")) {
            delete wallet.path;
        }
        wallet.coin = coin;
        wallet.index = i;
        addressList.push(wallet);
    }
    if ($0) {
        console.table(addressList);
    } else {
        return addressList;
    }

}
