// const m = require('./Makers.js')
// const Tx = require('./tx.js').TX
// const App = require('../function/appConfigs.js').APP

// const fs = require('fs')

const k = require('../appStructure/keyElements.js');
const ethereumtx = require('ethereumjs-tx');
const abitor = require('ethereumjs-abi')

// for testing in kovan
const adr = '0x3d41d04f27efe6e837dce30f3412f98c9ade47ef'
const prvkey = '0x10d15544a7574be02706b40172b6caed48ac8de21bfd96c6c9e32bd9e0e47727'

class Getter {
  constructor() {
    this.co = k._INIT.Getter
  }

  setNode(name, address) {
    return new Promise((resolve,reject)=>{

      this.transact(his.genTx(name,address))
      .then(log => { resolve(true) })
      .catch(err => { reject(err) })

    })
  }

  genTx(name, url) {
    let method = co.methods.setUserNode(name, url).encodeABI()
    let tx = {
      from: adr,
      to: this.co._address,
      gasPrice: "20000000000",
      gas: "3000000",
      value: '0',
      data: method
    }
    k.infura.eth.accounts.signTransaction(tx, prvkey).then(signed => {
      return signed.rawTransaction;
    });
  }

  transact(raw) {
    return new Promise((resolve,reject)=>{
      k.infura.eth.sendSignedTransaction(raw)
      .on('confirmation', console.log)
      .on('transactionHash', console.log)
      .on('receipt', log => { resolve(log) })
      .on('error', err => { rejet(err) })
    })
  }
}

module.exports = {
  Getter
}
