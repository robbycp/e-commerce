const Transaction = require('../models/model-transaction')
const Product = require('../models/model-product')
const ObjectId = require('mongoose').Types.ObjectId

class ControllerTransaction {
  static createAddCart(req, res, next) {
    let promiseTrx = Transaction.findOne({
      buyerId: ObjectId(req.userId),
      transactionStatus: 'cart'
    })
    let promiseProduct = Product.findById(req.body._id)

    Promise.all([promiseTrx, promiseProduct])
      .then((values) => {
        let resultTrx = values[0]
        let resultProduct = values[1]
        let newTransaction = {
          itemBought: [{
            item: resultProduct,
            quantity: 1
          }],
          paymentStatus: 'unpaid',
          transactionStatus: 'cart',
          buyerId: ObjectId(req.userId)
        }
        if (!resultProduct) {
          throw ({code: 404, message: 'Product not found'})
        } else if (!resultTrx) {
          return Transaction.create(newTransaction)
        } else {
          let indexProd = resultTrx.itemBought.map((one) => one.item._id).indexOf(resultProduct._id)
          if (indexProd > -1) {
            resultTrx.itemBought[indexProd].quantity++
          } else {
            resultTrx.itemBought.push({
              item: resultProduct,
              amount: 1
            })
          }
          return resultTrx.save()
        }
      })
      .then((result) => {
        res.status(201).json(result)
      })
      .catch(next)
  }

  static readAllwFilter(req, res, next) {
    let schemaField = Object.keys(Transaction.prototype.schema.paths)
    let filteredField = Object.keys(req.body).filter((x) => schemaField.indexOf(x) > -1)
    let query = filteredField.reduce((acc, el) => Object.assign(acc, {[el]: req.body[el]}), {})

    Transaction.find(query).populate('user_id').lean()
      .then((transactions) => {
        res.json(transactions)
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    Transaction.findById(req.params.id)
      .then((transaction) => {
        res.json(transaction)
      })
      .catch(next)
  }
  
  static delete(req, res, next) {
    let id = req.params.id
    Transaction.findById(id)
      .then((transaction) => {
        if (!transaction) throw { code: 404 }
        else {
          return Transaction.deleteOne({ _id: id})
        } 
      })
      .then((data) => {
        res.status(201).json({
          message: 'successfully delete transaction'
        })
      })
      .catch(next)
  }  
}

module.exports = ControllerTransaction