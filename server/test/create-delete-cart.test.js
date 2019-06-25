const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app.js')
const { deleteTransaction } = require('../helpers/delete-data')

chai.use(chaiHttp)

const expect = chai.expect;
var productIdCreated1, productIdCreated2
var token

before(function(done) {
  let userCredentials = {
    username: 'robbycp',
    password: 'robbycp',
  }
  chai
    .request(app)
    .post('/users/login')
    .send(userCredentials)
    .then((res) => {
      token = res.body.token
      let inputPost1 = {
        name: 'Topi Hijrah',
        description: 'Topi hijrah cocok untuk hijrah style',
        stock: [{
          typeStock: 'all-size',
          amount: 40
        },],
        image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/8/357645562/357645562_36081d03-32fa-4bad-b828-ff8c674495d3_640_640.jpg',
        price: 100000,
        currency: 'IDR',
        category: 'accessories'
      }
      let inputPost2 = {
        name: 'Topi NU',
        description: 'Topi NU cocok untuk orang orang NU',
        stock: [{
          typeStock: 'all-size',
          amount: 20
        },],
        image: 'https://s3.bukalapak.com/img/8915936105/s-194-194/NH_01.jpg',
        price: 50000,
        currency: 'IDR',
        category: 'accessories'
      }
      let promiseCreateProduct1 = chai.request(app).post('/products').set('token', res.body.token).send(inputPost1)
      let promiseCreateProduct2 = chai.request(app).post('/products').set('token', res.body.token).send(inputPost2)
      return Promise.all([promiseCreateProduct1, promiseCreateProduct2])
    })
    .then((values) => {
      productIdCreated1 = values[0].body._id
      productIdCreated2 = values[1].body._id
      console.log('hasil created data', values[0].body)
      console.log('hasil created data', values[1].body)
      done()
    })
    .catch((err) => {
      console.log(err)
    })
})

after(function() {
  deleteTransaction()
})

describe('Add to cart product', function() {
  it('should return status 201 and properties _id, itemBought, paymentStatus, transactionStatus, buyerId', function(done) {
    let sendProductId = {
      _id: productIdCreated1
    }
    chai
      .request(app)
      .post('/transactions')
      .set('token', token)
      .send(sendProductId)
      .then((res) => {
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('_id')
        expect(res.body.itemBought[0].item._id).to.equal(sendProductId._id)
        expect(res.body).to.have.property('paymentStatus', 'unpaid')
        expect(res.body).to.have.property('transactionStatus', 'cart')
        expect(res.body).to.have.property('buyerId')
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })
  it('should return amount added updated in transaction if the product is already in cart', function(done) {
    let sendProductId = {
      _id: productIdCreated1
    }
    chai
      .request(app)
      .post('/transactions')
      .set('token', token)
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
  it('should add more item and quantity if no product match in transaction', function(done) {
    let sendProductId = {
      _id: productIdCreated2
    }
    chai
      .request(app)
      .post('/transactions')
      .set('token', token)
      .send(sendProductId)
      .then((res) => {
        expect(res).to.have.status(201)
        expect(res.body.itemBought[1].item._id).to.equal(productIdCreated2)
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })
  it('should return status 400 and error message if no product found', function(done) {
    let sendProductId = {
      _id: 'testingsalah'
    }
    chai
      .request(app)
      .post('/transactions')
      .set('token', token)
      .send(sendProductId)
      .then((res) => {
        console.log('ini hasil res di test add third', res.body)
        expect(res).to.have.status(404)
        expect(res.body).to.have.property('message', 'Product not found')
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })
})

describe('Get data transaction for login customer', function() {
  it('should return status 200 and data transaction for login customer with field', function(done) {
    chai
      .request(app)
      .get(`/transactions`)
      .set('token', token)
      .then((res) => {
        expect(res).to.have.status(200)
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
  // it('should return status 401 and message unauthorized for nonAdmin or nonUserId', function(done) {

  // })
})

describe('Get all transaction for admin', function() {
  it('should return status 200 and all data transaction field', function(done) {
    chai
      .request(app)
      .get(`/transactions/alltrx`)
      .set('token', token)
      .then((res) => {
        console.log('res.body get data traansaction', res.body)
        expect(res).to.have.status(200)
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
})

after(function() {
  describe('Delete product from add to cart', function() {
    it('should return status 201 and messaage sucessfully delete transaction', function(done) {
      chai
        .request(app)
        .delete(`/transaction/${productIdCreated1}`)
        .set('token', token)
        .then((res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('message', 'successfully delete transaction')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })
})