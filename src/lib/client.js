const { CosmWasmClient, SigningCosmWasmClient, GasPrice } = require('cosmwasm')
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing')
const { stringToPath } = require('@cosmjs/crypto')
const { RPC_ENDPOINT } = require('../config/variables.config')
const { OLD_NFT_CONTRACT_ADDRESS } = require('../constant/index')

const getClient = () => CosmWasmClient.connect(RPC_ENDPOINT)

const getContractAddr = () => {
  const contractAddr =
    'orai1n27agkvx9jx58qdce5ezcp7cx3zuefhzt75gg0f6kvw5a9ucujuqygykf4'

  if (!contractAddr) {
    throw Error('Contract address not found')
  }

  return contractAddr
}

const queryContract = async (contractAddr, queryMsg) => {
  const client = await getClient()
  return await client.queryContractSmart(contractAddr, queryMsg)
}

const getAllTokensId = async () => {
  return await queryContract(getContractAddr(), { all_tokens: {} })
}

const executeContract = async (
  mnemonic,
  executeMsg,
  inputAmount,
  contractAddr,
) => {
  const prefix = process.env.PREFIX || 'orai'
  const denom = process.env.DENOM || 'orai'
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    hdPaths: [stringToPath(process.env.HD_PATH || "m/44'/118'/0'/0/0")],
    prefix,
  })
  const [firstAccount] = await wallet.getAccounts()

  const client = await SigningCosmWasmClient.connectWithSigner(
    RPC_ENDPOINT,
    wallet,
    {
      gasPrice: GasPrice.fromString('0.025orai'),
      prefix,
    },
  )

  const amount = inputAmount ? [{ amount: inputAmount, denom }] : undefined

  const result = await client.execute(
    firstAccount.address,
    contractAddr,
    executeMsg,
    'auto',
    mnemonic,
    amount,
  )
  return result
}

const commit = async () => {
  return await executeContract(
    'normal disorder endorse legal kiwi mask behind grunt inherit license battle garment',
    {
      commit: {
        token_id: '2',
        prompt: 'Big purple background',
      },
    },
    undefined,
    OLD_NFT_CONTRACT_ADDRESS,
  )
}

module.exports = { queryContract, executeContract, getAllTokensId, commit }
