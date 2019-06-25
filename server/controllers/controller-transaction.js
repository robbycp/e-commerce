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

  static readAllTransactionOneUser(req, res, next) {
    let input = {
      buyerId: ObjectId(req.userId)
    }

    Transaction.find(input).populate('buyerId').populate('itemBought')
      .then((transactions) => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static readAllTransaction(req, res, next) {
    Transaction.find().populate('buyerId').populate('itemBought')
      .then((transactions) => {
        res.status(200).json(transactions)
      })
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

  static checkout(req, res, next) {
    // tambah alamat, metode kirim, metode pembayaran baru checkout
    let transsactionId = req.params.id
    let updatedCheckout = { transactionStatus: 'checkout' }
    Transaction.findByIdAndUpdate(transsactionId, updatedCheckout, { useFindAndModify: false, new: true })
      .then((res) => {
        if (!res) throw ({ code: 404, messagee: 'Transaction not found'})
        else {
          res.status(201).json(res)
        }
      })
      .catch(next)
  }
}

module.exports = ControllerTransaction