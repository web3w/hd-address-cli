'use strict';
import inquirer from "inquirer";
import * as cli from "./cli.js";
import fs from 'fs'
export const { generateMnemonic, generateSeed, generateBase58, generateAddress } = cli



// 验证 seed 长度
function utf8Length(s) {
    var l = 0;
    for (var i = 0; i < s.length; i++) {
        var c = s.charCodeAt(i);
        if (c <= 0x007f) l += 1;
        else if (c <= 0x07ff) l += 2;
        else if (c >= 0xd800 && c <= 0xdfff) l += 2;  // surrogates
        else l += 3;
    }
    return l;
}

export function secretPrompt() {
    return inquirer.prompt([{
        type: "list",
        name: "secretType",
        message: "钱包根类型(HD Wallet root type)",
        choices: [
            new inquirer.Separator("-------随机(random)-------"),
            { name: "生成助记词(mnemonic)", value: "randomMnemo", checked: true },
            { name: "生成种子(seed)", value: "randomSeed" },
            // { name: "生成Base58", value: "randomBase58" },
            new inquirer.Separator("-------输入(input)-------"),
            { name: "输入助记词(mnemonic)", value: "mnemo" },
            { name: "输入种子(seed)", value: "seed" },
            // { name: "输入Base58", value: "base58" },
        ]
    },
    {
        type: "list",
        name: "language",
        message: "助记词的语言(mnemonic language)",
        choices: [
            { name: "Chinese", value: "CN", checked: true },
            { name: "English", value: "EN" },
            { name: "Japanese", value: "JA" },
        ],
        when: function (answers) {
            return answers.secretType == "randomMnemo"
        },
    },
    {
        type: 'input',
        name: "secret",
        message: "输入助记词(input mnemonic)",
        when: function (answers) {
            return answers.secretType == "mnemo"
        },
        validate: function (val) {
            // // 验证是否是中文
            // let pattern = new RegExp("[\u4E00-\u9FA5]+");

            // type: "password",
            // mask: '*',

            let wards = val.split(" ")
            if (wards < 2) {
                return "助记词必须空格分割(mnemonic must be separated by Spaces)";
            } else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: "secret",
        message: "随机生成种子(random seed)",
        default: function () {
            let { seed } = generateSeed()
            return seed.toString("hex")
        },
        when: function (answers) { // 当watch为true的时候才会提问当前问题
            return answers.secretType == "randomSeed"
        },
    },
    {
        type: "password",
        name: "secret",
        message: "输入助种子(input seed)",
        mask: '*',
        when: function (answers) {
            return answers.secretType == "seed"
        },
        validate: function (val) {
            if (utf8Length(val) > 127) {
                return true
            } else {
                return "种子至少128bits(Seed should be at least 128 bits)"
            }
        }
    },
    {
        type: 'input',
        name: "secret",
        message: "随机生成Base58(random base58)",
        default: function () {
            let { base58 } = generateBase58()
            return base58
        },
        when: function (answers) { // 当watch为true的时候才会提问当前问题
            return answers.secretType == "randomBase58"
        },
    },
    {
        type: "password",
        name: "secret",
        mask: '*',
        message: "输入Base58(input base58)",
        when: function (answers) { // 当watch为true的时候才会提问当前问题
            return answers.secretType == "base58"
        },
        validate: function (val) {
            if (utf8Length(val) > 127) {
                return true
            } else {
                return "Base58 should be at least 128 bits"
            }
        }
    },
    ])
}

export function mnemonicPrompt(language) {
    let prompet = [{
        type: 'input',
        name: "secret",
        message: "选择助记词语言(select mnemonic language)",
        default: function () {
            return generateMnemonic({ lang: language })
        },
    }]
    return inquirer.prompt(prompet)
}

export function hdQuestion(answers) {
    let prompt = [
        {
            type: "list",
            name: "coin",
            message: "选择需要生成的币种(HD coinType)",
            choices: [
                { name: "BTC(TopRoot)", value: "BTC_P2TR" },
                { name: "BTC(NativeSegwit)", value: "BTC_P2WPKH" },
                { name: "BTC(NestedSegwit)", value: "BTC_P2SH_P2WPKH" },
                { name: "BTC(Legacy)", value: "BTC_P2PKH", checked: true },
                new inquirer.Separator(),
                { name: "ETH", value: "ETH" },
                { name: "TRX", value: "TRX" },
            ]
        },
        // {
        //     type: "list",
        //     name: "account",
        //     message: "选择账户(account)",
        //     choices: [
        //         { name: "默认账户(0)", value: "0", checked: true },
        //         { name: "对公账户(1)", value: "1" },
        //         { name: "对私账户(2)", value: "2" },
        //         { name: "其他(3)", value: "3" },
        //     ]
        // },
        {
            type: "input",
            name: "accountOther",
            message: "输入账户(input account)",
            when: function (answers) {
                return answers.account == "3"
            },
            validate: function (val) {
                let reg = new RegExp("^[0-9]*$");
                if (reg.test(val)) { // 校验位数
                    return true;
                }
                return "请输入数字";
            }
        },
        // {
        //     type: "list",
        //     name: "change",
        //     message: "选择交易类型(change)",
        //     choices: [
        //         { name: "对外收款(0)", value: "0", checked: true },
        //         { name: "交易找零(1)", value: "1" },
        //         { name: "归集地址(2)", value: "2" },
        //         { name: "其他(3)", value: "3" },
        //     ]
        // },
        {
            type: "input",
            name: "changeOther",
            message: "定义交易类型(input change)",
            when: function (answers) {
                return answers.change == "3"
            },
            validate: function (val) {
                let reg = new RegExp("^[0-9]*$");
                if (reg.test(val)) { // 校验位数
                    return true;
                }
                return "请输入数字";
            }
        },
        {
            type: "input",
            name: "indexRange",
            message: "输入账户生成索引 (e.g 1-100) default(1-9)",
            validate: function (val) {
                let reg = new RegExp("^[0-9]*$");
                if (reg.test(val)) { // 校验位数
                    return true;
                } else {
                    let pass = val.match(/^([0-9]+)(-)([0-9]+)$/)
                    if (pass && Number(pass[1]) < Number(pass[3])) {
                        return true
                    }
                }
                return "请输入数字或者范围(e.g 1-100) default(1-10)";
            }
        },
    ]

    return inquirer.prompt(prompt).then(res => {
        let account = res.account == 3 ? res.accountOther : res.account
        let change = res.change == 3 ? res.changeOther : res.change
        let path = "m/" + account + "'/" + change + "/"
        let index, range
        let parts = res.indexRange.split('-');
        if (parts.length == 2) {
            range = res.indexRange
        } else {
            index = res.indexRange
        }
        let mnemonic, seed, base58
        let { secretType, secret } = answers
        if (secretType == "randomMnemo" || secretType == "mnemo") {
            mnemonic = secret
        }

        if (secretType == "randomBase58" || secretType == "base58") {
            base58 = secret
        }

        if (secretType == "randomSeed" || secretType == "seed") {
            seed = secret
        }


        let columns = "path,pri,pub"
        let options = { coin: res.coin, mnemonic, seed, base58, index, range, path, columns }

        return generateAddress(options)
    })
}


export function hdPrompt(answers) {
    let isRandom = answers.secretType.substr(0, 6) == "random"
    if (isRandom) {
        console.warn("注意备份(Please backup)", answers.secret)
    }
    hdQuestion(answers).then(res => {
        console.log(res)
        savePrompt(res)
    })
}

export function savePrompt(answers) {
    delete answers.pub
    delete answers.pri
    const clearContent = answers.map(val => {
        delete val.pub
        delete val.pri
        return val
    })
    const content = JSON.stringify(clearContent, null, 2)
    return inquirer.prompt([
        {
            type: 'input',
            name: 'filename',
            message: '请输入要保存的文件名:',
        },
    ]).then((answers) => {
        const filename = answers.filename;
        fs.writeFile(filename, content, (err) => {
            if (err) {
                console.error('文件保存失败:', err);
                return;
            }
            console.log(`文件 ${filename} 已成功保存。`);
        });
    }).catch((error) => {
        console.error('程序出错:', error);
    })
}