let User = require('../models/model-user')
let Product = require('../models/model-product')
let Transaction = require('../models/model-transaction')

module.exports = {
  deleteUserTesting() {
    if (process.env.NODE_ENV == 'test') {
      User.deleteOne({username: 'testing'})
        .then(() => {
          console.log('users cleared');
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  deleteProduct() {
    if (process.env.NODE_ENV == 'test') {
      Product.deleteMany({})
        .then(() => {
          console.log('Product cleared');
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  deleteTransaction() {
    if (process.env.NODE_ENV == 'test') {
      Transaction.deleteMany({})
        .then(() => {
          console.log('transaction cleared');
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
}