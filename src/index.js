const express = require('express')
const cors = require('cors')
const { PORT } = require('./config/variables.config')
const onYourNetwork = require('./config/onYourNetwork.config')
const { CosmWasmClient, GasPrice, setupWebKeplr } = require('cosmwasm')
const {
  getClient,
  getContractAddr,
  getAllTokensId,
  commit,
} = require('./lib/client')

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Server Work' })
})

app.get('/swap', (req, res) => {
  getAllTokensId()
    .then((data) => {
      {
        // console.log(data)
        res.json({ message: 'Swap', data })
      }
    })
    .catch((err) => console.log(err))
})

app.get('/commit', (req, res) => {
  commit()
    .then((data) => {
      {
        console.log(data)
        res.json({ message: 'Commit', data })
      }
    })
    .catch((err) => console.log(err))
})

app.listen(PORT, () => {
  console.clear()

  console.info(`Server running at
      Local:            http://localhost:${PORT}/
      On Your Network:  http://${Object.values(onYourNetwork)[0][0]}:${PORT}/`)
})
