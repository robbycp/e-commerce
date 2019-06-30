'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = require('../models/model-product')

var transactionSchema = new Schema({
  itemBought: [{
    item: { 
      type: Schema.Types.ObjectId, 
      ref: 'Product'
    },
    quantity: Number,
  }],
  paymentStatus: String, // unpaid => unpaid
  transactionStatus: String, // cart => checkout => payment received => send => success
  buyerId: {type: Schema.Types.ObjectId, ref: 'User'},
  address: String,
  sendMethod: String
}, {timestamps: true});

transactionSchema.virtual('totalTransaction').get(function () {
  return this.itemBought.reduce((acc, el) => acc + (el.item.price * el.quantity), 0)
})

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction