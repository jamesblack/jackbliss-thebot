import mongoose from 'mongoose'

const db = mongoose.connection

export default function() {
  return new Promise((resolve, reject) => {
    db.on('error', (error) => {
      console.error('Connection Error:', error)
      return reject()
    })

    db.once('open', () => {
      return resolve()
    })

    mongoose.connect(process.env.MONGOLAB_URI)
  })
}