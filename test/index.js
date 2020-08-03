let wallet = require('../lib/cli')

//-p "m/20'/0/0"
wallet.generateAddress({mnemonic: "aa", coin: "BTC", columns: "pri,path",index:4,hdpath:"m/20'/0/"})

// wallet.generateMnemonic({strength: "low", lang: "EN"})

