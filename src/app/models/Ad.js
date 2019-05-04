const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Ad = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date
  }
})

Ad.plugin(mongoosePaginate)

module.exports = mongoose.model('Ad', Ad)
