'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
  token: String,
}, {timestamps: true});

var Token = mongoose.model('Token', tokenSchema);

module.exports = Token