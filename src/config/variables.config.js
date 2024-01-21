const dotenv = require('dotenv')
dotenv.config()

exports.PORT = process.env.PORT || `3031`
exports.NETWORK = process.env.NETWORK
exports.RPC_ENDPOINT = process.env.RPC_ENDPOINT
exports.CHAIN_ID = process.env.CHAIN_ID
