#!/usr/bin/env node
import argv from "../lib/argv.js";
import { secretPrompt, mnemonicPrompt, hdPrompt, generateAddress } from "../lib/propmt.js";

let args = process.argv.splice(2);
if (args.length) {
    if (process.stdin) {
        process.stdin.setEncoding('utf8')
        process.stdin.resume()
        let content = ''
        process.stdin.on('data', (buf) => {
            content += buf.toString()
        })
        setTimeout(() => {
            if (!argv._.length) {
                debugger
                // 默认mnemonic
                argv.mnemonic = (content || argv.mnemonic || '').trim()

                if (argv.base58 != undefined) {

                    argv.base58 = (content || argv.base58 || '').trim()
                    argv.mnemonic = ""
                }

                if (argv.seed != undefined) {
                    argv.seed = (content || argv.seed || '').trim()
                    argv.mnemonic = ""
                }
                // console.log(argv)
                generateAddress(argv)
            }
            process.exit(0)

        }, 10)
    }
} else {
    secretPrompt().then((answers) => {
        if (answers.language) {
            mnemonicPrompt(answers.language).then(res => {
                answers.secret = res.secret
                hdPrompt(answers)
            })
        } else {
            hdPrompt(answers)
        }
    }
    );
}
