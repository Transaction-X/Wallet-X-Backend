const mongoose = require('mongoose');
// const User = require('./User');
const { Schema } = mongoose;
const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isIncome: {
    type: Boolean,
    default: false
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
