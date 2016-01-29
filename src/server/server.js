import express from 'express'

const app = express()

export function startServer(hookHandler) {
  app.get('/', (req, res) => {
    res.send('Please Dont')
  })

  app.listen(process.env.PORT || 3000)
}