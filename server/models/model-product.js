'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  description: String,
  stock: [{
    typeStock: String, // size
    amount: Number
  }],
  image: String,
  price: Number,
  currency: String,
  category: String
}, {timestamps: true});

var Product = mongoose.model('Product', productSchema);

module.exports = Product