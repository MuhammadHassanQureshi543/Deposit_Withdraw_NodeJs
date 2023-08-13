const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
      },
      uid: {
        type: Number,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      accountNumber: {
        type: String,
        required: true
      },
      accountTitle: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
      }
})

const request = mongoose.model('Request',requestSchema)
module.exports = request;