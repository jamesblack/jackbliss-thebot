import mongoose from 'mongoose'

const serverSchema = mongoose.Schema({
  _id: String, // ServerId
  played: [{
    _id: false,
    name: String, // Game Name
    players: [{
      _id: false,
      id: String, // Player Id
      played: Number // Seconds Played by Player
    }]
  }]
})

export default mongoose.model('Server', serverSchema)