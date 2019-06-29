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
    let resultTrx, resultProduct

    Promise.all([promiseTrx, promiseProduct])
      .then((values) => {
        resultTrx = values[0]
        resultProduct = values[1]
        if (!resultProduct) {
          throw ({code: 404, message: 'Product not found'})
        } else if (resultProduct.stock - req.body.quantity < 0) {
          throw ({ code: 400, message: 'Product out of stock' })
        } else if (!resultTrx) {
          let newTransaction = {
            itemBought: [{
              item: resultProduct._id,
              quantity: req.body.quantity
            }],
            paymentStatus: 'unpaid',
            transactionStatus: 'cart',
            buyerId: ObjectId(req.userId)
          }
          resultTrx = new Transaction(newTransaction)
          return resultTrx.save()
        } else {
          
          let indexProd = resultTrx.itemBought.map((one) => one.item._id).indexOf(resultProduct._id)
          if (indexProd > -1) {
            resultTrx.itemBought[indexProd].quantity++
          } else {
            resultTrx.itemBought.push({
              item: resultProduct._id,
              quantity: req.body.quantity
            })
          }
          return resultTrx.save()
        }
      })
      .then(() => {
        resultProduct.stock -= req.body.quantity
        return resultProduct.save()
      })
      .then(() => {
        res.status(201).json(resultTrx)
      })
      .catch(next)
  }

  static readAllTransactionOneUser(req, res, next) {
    let input = {
      buyerId: ObjectId(req.userId)
    }

    Transaction.find(input)
      .populate('buyerId', '_id full_name email username admin')
      .populate('itemBought')
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

  static readCart(req, res, next) {
    Transaction.find({ buyerId: req.userId, transactionStatus: 'cart'})
      .then((transaction) => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }

  static updateQuantity(req, res, next) {
    let newUpdateProduct = {
      _id: req.body._id,
      quantity: req.body.quantity
    }
    let product, transaction
    let promiseProduct = Product.findById(newUpdateProduct._id)
    let promiseTrx = Transaction.findById(req.params.id)
    Promise.all([promiseProduct, promiseTrx])
      .then((values) => {
        product = values[0]
        transaction = values[1]
        if (!transaction) throw { code: 404, message: 'Transaction not found' }
        else if (!product) throw { code: 404, message: 'Product not found' }
        else {
          transaction.itemBought.forEach((item, index) => {
            if (item.item == newUpdateProduct._id) {
              let diffStock
              if (newUpdateProduct.quantity < item.quantity) {
                diffStock = item.quantity - newUpdateProduct.quantity
                product.stock += diffStock
              } else {
                diffStock = newUpdateProduct.quantity - item.quantity
                product.stock -= diffStock
              }
              transaction.itemBought[index].quantity = newUpdateProduct.quantity
            }
          })
        }
        return Promise.all([transaction.save(), product.save()])
      })
      .then((values) => {
        transaction = values[0]
        product = values[1]
        // console.log('ini hasil update transaksi', transaction)
        // console.log('ini hasil update stock', product);
        res.status(201).json(transaction)
      })
      .catch(next)
  }
  
  static deleteOneProduct(req, res, next) {
    let id = req.params.id
    let productId = req.body._id
    Transaction.findById(id)
      .then((transaction) => {
        if (!transaction) throw { code: 404 }
        else {
          transaction.itemBought = transaction.itemBought.filter((item) => {
            // console.log('ini item', item.item.toString())
            // console.log('ini item', typeof item.item.toString())
            // console.log('ini productId', productId)
            // console.log('ini productId', typeof productId)
            // console.log('perbandingan', item.item.toString() !== productId)
            return item.item.toString() !== productId
          })
          console.log('ini sebelum di save setelah di filter', transaction)
          return transaction.save()
        } 
      })
      .then((data) => {
        console.log('ini hasil delete one product di cart', data)
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