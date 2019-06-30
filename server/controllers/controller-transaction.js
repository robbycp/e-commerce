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
    Transaction.find()
      .populate('buyerId', 'full_name email username')
      .populate('itemBought.item')
      .then((transactions) => {
        res.status(200).json(transactions)
      })
  }

  static readOne(req, res, next) {
    Transaction.findById(req.params.id)
      .populate('buyerId', 'full_name email username')
      .populate('itemBought.item')
      .then((transaction) => {
        let sendData = {
          _id: transaction._id,
          updatedAt: transaction.updatedAt,
          sendMethod: transaction.sendMethod,
          itemBought: transaction.itemBought,
          total: transaction.totalTransaction
        }
        res.json(sendData)
      })
      .catch(next)
  }

  static readCart(req, res, next) {
    Transaction
      .find({ buyerId: req.userId, transactionStatus: 'cart'})
      .populate('itemBought.item')
      .then((transaction) => {
        res.status(200).json(transaction[0])
      })
      .catch(next)
  }

  static updateQuantity(req, res, next) {
    let updateTrx = req.body.updatedTrx
    let promiseProduct = []
    updateTrx.itemBought.forEach(product => {
      promiseProduct.push(Product.findById(product.item._id))
    })
    let promiseTrx = Transaction.findById(req.params.id)
    let promises = [promiseTrx, ...promiseProduct]
    let products = []
    let transaction
    Promise.all(promises)
      .then((values) => {
        transaction = values[0]
        products = values.slice(1)
        if (!transaction) throw { code: 404, message: 'Transaction not found' }
        else if (products.length !== updateTrx.itemBought.length) {
          throw { code: 404, message: 'Product not found' }
        }
        else {
          let promiseSaveProduct = []
          transaction.itemBought.forEach((item, index) => {
            let productDbIndex = products.findIndex((el) => {
              return el._id.toString() == item.item.toString()
            })
            let productUpdIndex = updateTrx.itemBought.findIndex((el) => {
              return el.item._id.toString() == item.item.toString()
            })
            let diffStock
            if (updateTrx.itemBought[productUpdIndex].quantity < item.quantity) {
              diffStock = item.quantity - updateTrx.itemBought[productUpdIndex].quantity
              products[productDbIndex].stock += diffStock
            } else {
              diffStock = updateTrx.itemBought[productUpdIndex].quantity - item.quantity
              products[productDbIndex].stock -= diffStock
            }
            transaction.itemBought[index].quantity = updateTrx.itemBought[productUpdIndex].quantity
            promiseSaveProduct.push(products[productDbIndex].save())
          })
          promiseTrx = transaction
          return Promise.all(promiseSaveProduct)
        }
      })
      .then((products) => {
        return promiseTrx.save()
      })
      .then((values) => {
        let transaction = values
        res.status(201).json(transaction)
      })
      .catch(next)
  }
  
  static deleteOneProduct(req, res, next) {
    let transaction, product
    let id = req.params.id
    let productId = req.body._id
    let promiseTrx = Transaction.findById(id)
    let promiseProduct = Product.findById(productId)
    Promise.all([promiseTrx, promiseProduct])
      .then((values) => {
        transaction = values[0]
        product = values[1]
        if (!transaction) throw { code: 404 }
        else {
          let deletedProduct
          // update itembought in transaction
          transaction.itemBought = transaction.itemBought.filter((item) => {
            deletedProduct = item
            return item.item.toString() !== productId
          })
          // update product stock
          product.stock += deletedProduct.quantity
          return Promise.all([product.save(), transaction.save()])
        } 
      })
      .then((values) => {
        let product = values[0]
        let transaction = values[1]
        res.status(201).json({
          message: 'successfully delete transaction'
        })
      })
      .catch(next)
  }  

  static checkout(req, res, next) {
    let transsactionId = req.params.id
    let updatedCheckout = { 
      transactionStatus: 'checkout',
      address: req.body.address,
      sendMethod: req.body.sendMethod
    }
    Transaction.findByIdAndUpdate(transsactionId, updatedCheckout, { useFindAndModify: false, new: true })
      .then((result) => {
        if (!result) throw ({ code: 404, messagee: 'Transaction not found'})
        else {
          res.status(201).json(result)
        }
      })
      .catch(next)
  }
}

module.exports = ControllerTransaction