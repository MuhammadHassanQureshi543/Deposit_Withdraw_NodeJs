const mongoose = require('mongoose');
const withdrawSchema = new mongoose.Schema({
    user_id: {
        type: String,
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

const withdraw = mongoose.model('Withdraw',withdrawSchema)
module.exports = withdraw;