const { decodeToken } = require('../helpers/jwt-helper')
const User = require('../models/model-user')
const Token = require('../models/model-blacklist-token')
const Transaction = require('../models/model-transaction')
const ObjectId = require('mongoose').Types.ObjectId; 

module.exports = {
  authentication: (req, res, next) => {
    try {
      console.log('########## Checking authentication');
      let payload = decodeToken(req.headers.token)
      Promise.all([User.findOne({_id: payload.userId}), Token.findOne({token: req.headers.token})])
        .then(result => {
          let [user, token] = result
          if (!user) {
            console.log('user fail');
            next({ code: 401 })
          }
          if (token) {
            console.log('token fail');
            next({ code: 404, message: 'Please logout and login again'})
          }
          console.log('authentication done');
          req.userId = payload.userId
          req.user = user
          next()
        })
        .catch(next)
    } catch (err) {
      next({error: err})
    }
    
  },
  authorizationAdmin: function(req, res, next) {
    console.log('########## Checking authorization admin');
    try {
      if (req.user.admin) {
        console.log('authorization admin done')
        next()
      } else {
        console.log('Unauthorized not admin')
        next({ code: 404 })
      }
    } catch (err) {
      next({error: err})
    }
  },
  authorizationCustomer: function(req, res, next) {
    console.log('########### Checking authorization customer');
    try {
      Transaction.findById(req.params.id)
        .then((transaction) => {
          if (transaction.buyerId._id == req.userId || req.user.admin) {
            next()
          } else {
            next({code: 404})
          }
        })
    } catch (err) {
      next({error: err})
    }
    
  }
}