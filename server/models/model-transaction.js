'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
  itemBought: [{
    item: { 
      type: 'ObjectId', 
      ref: 'Product'
    },
    quantity: Number,
  }],
  paymentStatus: String, // unpaid => unpaid
  transactionStatus: String, // cart => checkout => payment received => send => success
  buyerId: {type: 'ObjectId', ref: 'User'}
}, {timestamps: true});

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction