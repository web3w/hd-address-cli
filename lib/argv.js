'use strict';
// import { generateMnemonic, generateSeed, generateBase58 } from "./cli.js";

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import * as cli from "./cli.js";

export default yargs(hideBin(process.argv))
    .usage('\nUsage: $0 <cmd> [args]')
    .example('$0 -c "BTC" -m "tag volcano eight thank tide" -l pri')
    .epilog('copyright 2022')
    .alias({
        v: 'version',
        c: 'coin',
        i: 'index',
        l: 'columns',
        r: 'range',
        m: 'mnemonic',
        s: 'seed',
        b: 'base58',
        p: 'path',
        h: "help"
    }).default({
        c: "BTC",
        r: "1-10"
    }).describe({
        c: "Coin name (e.g. BTC,BCH,LTC,ETH,TRX,BTC_TEST,BCH_TEST,LTC_TEST)",
        i: "Account Index (e.g. 6)",
        l: "Columns to display (e.g. pub,pri,path)",
        r: "Account Index Range (e.g 1-100)",
        m: "Mnemonic",
        s: "Seed in hex format",
        b: 'Base58 format',
        p: "You can specify account and change path (e.g. 'm/20'/0/')",
    }).string(["c", 'l', "r", "m", "s", "p", "b"])
    .number(["i"])
    .demand(['c'])
    .command("mnemonic [strength,lang]", "Generate random mnemonic", function (yargs) {
        // let argv = yargs.reset()
        yargs.positional("lang", {
            alias: "l",
            default: "EN",
            description: "mnemonic lang"
        }).positional("strength", {
            alias: "s",
            default: "low",
            description: "mnemonic strength"
        }).argv;
    }, (argv) => {
        cli.generateMnemonic(argv)
    })
    .command("seed [strength]", "Generate random seed", function (yargs) {
        yargs.positional('strength', {
            alias: "s",
            describe: 'seed strength',
            default: "low"
        }).argv;
    }, (argv) => {
        console.log(argv)
        cli.generateSeed(argv)
    })
    .command("base58 [strength]", "Generate random base58", function (yargs) {
        yargs.positional('strength', {
            alias: "s",
            describe: 'base58 strength',
            default: "low"
        }).argv;
    }, (argv) => {
        cli.generateBase58(argv)
    })
    .argv;
