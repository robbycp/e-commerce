'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  description: String,
  stock: {
    type: Number,
    min: [0, 'Product cant have stock below 0']
  },
  image: String,
  price: {
    type: Number,
    min: [0, 'Product cant have price below 0']
  },
  currency: String,
  category: String
}, {timestamps: true});

var Product = mongoose.model('Product', productSchema);

module.exports = Product