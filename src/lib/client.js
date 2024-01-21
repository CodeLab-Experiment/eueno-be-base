const { CosmWasmClient, SigningCosmWasmClient, GasPrice } = require('cosmwasm')
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing')
const { stringToPath } = require('@cosmjs/crypto')
const { RPC_ENDPOINT } = require('../config/variables.config')

exports.getClient = () => CosmWasmClient.connect(RPC_ENDPOINT)

exports.getContractAddr = () => {
  const contractAddr =
    'orai1n27agkvx9jx58qdce5ezcp7cx3zuefhzt75gg0f6kvw5a9ucujuqygykf4'

  if (!contractAddr) {
    throw Error('Contract address not found')
  }

  return contractAddr
}

exports.getAllTokensId = async () => {
  const client = await CosmWasmClient.connect(RPC_ENDPOINT)
  return await client.queryContractSmart(
    'orai1n27agkvx9jx58qdce5ezcp7cx3zuefhzt75gg0f6kvw5a9ucujuqygykf4',
    {
      all_tokens: {},
    },
  )
}

exports.commit = async () => {
  const prefix = process.env.PREFIX || 'orai'
  const denom = process.env.DENOM || 'orai'
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
    'normal disorder endorse legal kiwi mask behind grunt inherit license battle garment',
    {
      hdPaths: [stringToPath(process.env.HD_PATH || "m/44'/118'/0'/0/0")],
      prefix,
    },
  )
  const [firstAccount] = await wallet.getAccounts()

  const client = await SigningCosmWasmClient.connectWithSigner(
    RPC_ENDPOINT,
    wallet,
    {
      gasPrice: GasPrice.fromString('0.025orai'),
      prefix,
    },
  )
  console.log('firstAccount.address: ', firstAccount.address)

  const msg = {
    commit: {
      token_id: '2',
      prompt: 'test',
    },
  }
  //   const amount = argv.amount ? [{ amount: argv.amount, denom }] : undefined
  const result = await client.execute(
    firstAccount.address,
    'orai1094ellehzmlsqf6uax7lhlayggd6wf8vu2ejtlzfgk7e8d4pjgssglxvsf',
    msg,
    'auto',
    'normal disorder endorse legal kiwi mask behind grunt inherit license battle garment',
    // amount,
    undefined,
  )
  //   console.log('result: ', result)
  return result
}
