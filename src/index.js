const express = require('express')
const cors = require('cors')
const { PORT } = require('./config/variables.config')
const onYourNetwork = require('./config/onYourNetwork.config')
const { getAllTokensId, commit } = require('./lib/client')

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Server Work' })
})

app.get('/get-all-tokens-id', async (req, res, next) => {
  try {
    const data = await getAllTokensId()
    res.json({ message: 'Get all tokens id', data })
  } catch (err) {
    next(err)
  }
})

app.get('/commit', async (req, res, next) => {
  try {
    const data = await commit()
    res.json({ status: 'success', transactionHash: data.transactionHash })
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

app.listen(PORT, () => {
  console.clear()

  console.info(`Server running at
      Local:            http://localhost:${PORT}/
      On Your Network:  http://${Object.values(onYourNetwork)[0][0]}:${PORT}/`)
})
