const { decodeToken } = require('../helpers/jwt-helper')
const User = require('../models/model-user')
const Token = require('../models/model-blacklist-token')
const Transaction = require('../models/model-transaction')
const ObjectId = require('mongoose').Types.ObjectId; 

module.exports = {
  authentication: (req, res, next) => {
    try {
      console.log('########## Checking authentication Customer');
      let payload = decodeToken(req.headers.token)
      Promise.all([User.findOne({_id: payload.userId}), Token.findOne({token: req.headers.token})])
        .then(result => {
          let [user, token] = result
          if (!user) {
            console.log('user fail');
            throw { code: 401 }
          }
          if (token) {
            console.log('token fail');
            throw { code: 404, message: 'Please logout and login again'}
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
  authenticationAdmin: (req, res, next) => {
    try {
      console.log('########## Checking authentication Admin');
      let payload = decodeToken(req.headers.token)
      Promise.all([User.findOne({_id: payload.userId}), Token.findOne({token: req.headers.token})])
        .then(result => {
          let [user, token] = result
          if (!user || !user.admin) {
            console.log('user is not admin');
            throw { code: 401 }
          }
          if (token) {
            console.log('token fail');
            throw { code: 404, message: 'Please logout and login again'}
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
  authorizationCustomer: function(req, res, next) {
    console.log('########### Checking authorization customer');
    Transaction.findById(req.params.id)
      .then((transaction) => {
        // console.log('authorization customer transaction', transaction.buyerId)
        // console.log('req.userid', req.userId)
        // console.log('ini req.user admin', req.user)
        // console.log('result if', transaction.buyerId == req.userId || req.user.admin)
        if (transaction.buyerId == req.userId || req.user.admin) {
          console.log('authorization customer done')
          next()
        } else {
          throw { code: 401 }
        }
      })
      .catch(next)
    
  }
}