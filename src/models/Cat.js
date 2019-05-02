const mongoose = require('mongoose')

module.exports = mongoose.model('Cat', {
  name: {
    type: String,
    unique: true
  },
  description: String
})
