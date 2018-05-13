const exec = require('child_process').exec,
   Web3Gen = require('./Web3Generator.js'),
    Quorum = require('../Quorum/setupFromConfig.js'),
  Q_config = require('../Quorum/config.js');

// running new semi-private chain
class SemiPrivateChain {
  constructor(name) {
    this.name = name;
  }

  setup() {
    return new Promise((resolve, reject) => {
      Q_config.setup.role = 'coordinator';
      Q_config.identity.nodeName = this.name;
      ++Q_config.ports.gethNodeRPC;
      Quorum.run()
      .then(() => { resolve(true); })
      .catch(err => { console.log(err) });
    });
  }

  join(remoteIpAddress) {
    return new Promise((resolve, reject) => {
      Q_config.setup.role = 'non-coordinator';
      Q_config.remoteIpAddress = remoteIpAddress;
      ++Q_config.ports.gethNodeRPC;
      Quorum.run()
      .then(() => { resolve(true); })
      .catch(err => { console.log("") });
    });
  }
}

function newWeb3Provider(mec) {
  return Web3Gen.newRemoteProvider(mec);
}

function execute(command){
  return new Promise((resolve,reject)=>{
    exec(command, function(error, stdout, stderr){
      if(error) reject(error);
      else if(stdout) resolve(stdout);
      else if(stderr) resolve(stderr);
    });
  });
}

module.exports = {
  SemiPrivateChain,
  newWeb3Provider,
  execute
}
