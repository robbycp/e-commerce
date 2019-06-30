const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')

const app = require('../app.js')
const { deleteTransaction } = require('../helpers/delete-data')

chai.use(chaiHttp)

const expect = chai.expect;
var productIdCreated1 = '5d1623b8cb1ce17f80984d9d'
var productIdCreated2 = '5d1624112e1c847fece6a429'
var tokenUser1, tokenUser2
var transaction1, transaction2
var transactionId1

let userCredentials1 = {
  username: 'robbycp',
  password: 'robbycp',
}
let userCredentials2 = {
  username: 'nonadmin',
  password: 'nonadmin',
}


before(function(done) {
  describe('initializing login token', function() {
    let promLoginUser1 = chai.request(app).post('/users/login').send(userCredentials1)
    let promLoginUser2 = chai.request(app).post('/users/login').send(userCredentials2)
    Promise.all([promLoginUser1, promLoginUser2])
      .then((values) => {
        tokenUser1 = values[0].body.token
        tokenUser2 = values[1].body.token
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })
})

after(function() {
  deleteTransaction()
})

describe('Add to cart product', function() {
  before(function(done) {
    let promProd1 = chai.request(app).put(`/products/${productIdCreated1}`).set('token', tokenUser1).send({ stock: 2 })
    let promProd2 = chai.request(app).put(`/products/${productIdCreated2}`).set('token', tokenUser1).send({ stock: 100 })
    Promise.all([promProd1, promProd2])
      .then(() => {
        console.log('success update stock to 2')
        done()
      })
      .catch((err) => {
        console.log(err);
      })
  })
  it('should return status 201 and properties _id, itemBought, paymentStatus, transactionStatus, buyerId', function(done) {
    let sendProductId = {
      _id: productIdCreated1,
      quantity: 1,
    }
    chai
      .request(app)
      .post('/transactions')
      .set('token', tokenUser1)
      .send(sendProductId)
      .then((res) => {
        transaction1 = res.body
        transactionId1 = res.body._id
        console.log('test pertama', res.body)
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('_id')
        expect(res.body.itemBought[0].item).to.equal(sendProductId._id)
        expect(res.body.itemBought[0].quantity).to.equal(sendProductId.quantity)
        expect(res.body).to.have.property('paymentStatus', 'unpaid')
        expect(res.body).to.have.property('transactionStatus', 'cart')
        expect(res.body).to.have.property('buyerId')
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })
  it('should return quantity added updated in transaction if the product is already in cart', function(done) {
    let sendProductId = {
      _id: productIdCreated1,
      quantity: 1,
    }
    chai
      .request(app)
      .post('/transactions')
      .set('token', tokenUser1)
      .send(sendProductId)
      .then((res) => {
        expect(res).to.have.status(201)
        expect(res.body.itemBought[0].quantity).to.equal(2)
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })
  it('should add more item and quantity if no product match in transaction itemBought', function(done) {
    let sendProductId = {
      _id: productIdCreated2,
      quantity: 1,
    }
    chai
      .request(app)
      .post('/transactions')
      .set('token', tokenUser1)
      .send(sendProductId)
      .then((res) => {
        expect(res).to.have.status(201)
        expect(res.body.itemBought[1].item).to.equal(productIdCreated2)
        expect(res.body.itemBought[1].quantity).to.equal(sendProductId.quantity)
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })
  it('should return status 400 and error message if no product found', function(done) {
    let sendProductId = {
      _id: 'testingsalah',
      quantity: 1
    }
    chai
      .request(app)
      .post('/transactions')
      .set('token', tokenUser1)
      .send(sendProductId)
      .then((res) => {
        expect(res).to.have.status(404)
        expect(res.body).to.have.property('message', 'Product not found')
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })
  it('should return status 400 and error message product out of stock', function(done) {
    let sendProductId = {
      _id: productIdCreated1,
      quantity: 101
    }
    chai
      .request(app)
      .post('/transactions')
      .set('token', tokenUser1)
      .send(sendProductId)
      .then((res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('message', 'Product out of stock')
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })
  after(function() {
    describe('Get data transaction for login customer only', function() {
      it('should return status 200 and data transaction for login customer with field', function(done) {
        chai
          .request(app)
          .get(`/transactions`)
          .set('token', tokenUser1)
          .then((res) => {
            expect(res).to.have.status(200)
            done()
          })
          .catch(err => {
            console.log(err)
          })
      })
      it('should return status 200 and data transaction for login customer with field customer no password', function(done) {
        chai
          .request(app)
          .get(`/transactions`)
          .set('token', tokenUser1)
          .then((res) => {
            expect(res).to.have.status(200)
            expect(res.body[0].buyerId).to.not.have.property('password')
            done()
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
    describe('Update product quantity in the cart', function() {
      it('should return status 201 and return updated transaction quantity', function(done) {
        let newQuantity = 2
        console.log('ini transaction1 before', transaction1)
        let productObserved = transaction1.itemBought[0]
        transaction1.itemBought[0].quantity = newQuantity
        console.log('ini transaction1 after', transaction1)
        let send = {
          updatedTrx: transaction1
        }
        chai
          .request(app)
          .put(`/transactions/${transactionId1}`)
          .set('token', tokenUser1)
          .send(send)
          .then((res) => {
            expect(res).to.have.status(201)
            // res.body.itemBought.forEach((product) => {
            //   if (product.item == updatedCart._id) {
            //     expect(product.quantity).to.equal(updatedCart.quantity)
            //   }
            // })
            done()
          })
          .catch(err => {
            console.log(err)
          })
      })
      it('should return error messaage stock cant below zero if updated quantity make the stock below zero', function(done) {
        let updatedCart = {
          _id: productIdCreated1,
          quantity: 100,
        }
        chai
          .request(app)
          .put(`/transactions/${transactionId1}`)
          .set('token', tokenUser1)
          .send(updatedCart)
          .then((res) => {
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('message', 'Product cant have stock below 0')
            done()
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
    describe('Delete product from add to cart', function(done) {
      it('should return status 400 and message Unauthorized for other customer deleting', function(done) {
        let deletedProduct = {
          _id: productIdCreated2
        }
        chai
          .request(app)
          .delete(`/transactions/${transactionId1}`)
          .set('token', tokenUser2)
          .send(deletedProduct)
          .then((res) => {
            expect(res).to.have.status(401)
            expect(res.body).to.have.property('message', 'Unauthorized')
            done()
          })
          .catch(err => {
            console.log(err)
          })
      })
      it('should return status 201 deleting one product for authorized customer', function(done) {
        let deletedProduct = {
          _id: productIdCreated2
        }
        chai
          .request(app)
          .delete(`/transactions/${transactionId1}`)
          .set('token', tokenUser1)
          .send(deletedProduct)
          .then((res) => {
            expect(res).to.have.status(201)
            expect((res.body.itemBought)).to.not.have
            done()
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
    describe('Get cart trx for customer', function() {
      it('should return status 200 and all data transaction field', function(done) {
        chai
          .request(app)
          .get(`/transactions/cart`)
          .set('token', tokenUser1)
          .then((res) => {
            expect(res).to.have.status(200)
            done()
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
    describe('Get all transaction for admin', function() {
      it('should return status 200 and all data transaction field', function(done) {
        chai
          .request(app)
          .get(`/transactions/alltrx`)
          .set('token', tokenUser1)
          .then((res) => {
            expect(res).to.have.status(200)
            done()
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
    describe('Checkout cart', function() {
      it('should return status 401 to checkout by other user', function(done) {
        chai
          .request(app)
          .delete(`/transactions/${transactionId1}`)
          .set('token', tokenUser2)
          .then((res) => {
            expect(res).to.have.status(401)
            expect(res.body).to.have.property('message', 'Unauthorized')
            done()
          })
          .catch(err => {
            console.log(err)
          })
      })
      it('should return status 201 and updated transaction with new status checkout', function(done) {
        chai
          .request(app)
          .delete(`/transactions/${transactionId1}`)
          .set('token', tokenUser1)
          .then((res) => {
            expect(res).to.have.status(201)
            // expect(res.body).to.have.property('message', 'successfully ')
            done()
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
  })
})