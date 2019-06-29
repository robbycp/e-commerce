const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app.js')
const { deleteProductTesting } = require('../helpers/delete-data')

chai.use(chaiHttp)

const expect = chai.expect;
var tokenAdmin, tokenNonAdmin
var productIdCreated
var inputPost = {
  name: 'Topi Hijrah',
  description: 'Topi hijrah cocok untuk hijrah style',
  stock: 40,
  image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/8/357645562/357645562_36081d03-32fa-4bad-b828-ff8c674495d3_640_640.jpg',
  price: 100000,
  currency: 'IDR',
  category: 'testing'
}

let inputPostUpdate = {
  name: 'Topi Hijrah edit',
  description: 'Topi hijrah cocok untuk hijrah style edit',
  stock: 35,
  image: '',
  price: 10000,
  currency: 'IDR',
  category: 'testing'
}

before(function(done) {
  let userCredentialsAdmin = {
    username: 'robbycp',
    password: 'robbycp',
  }
  let userCredentialsNonAdmin = {
    username: 'nonadmin',
    password: 'nonadmin',
  }
  let promiseLoginAdmin = chai.request(app).post('/users/login').send(userCredentialsAdmin)
  let promiseLoginNonAdmin = chai.request(app).post('/users/login').send(userCredentialsNonAdmin)
  Promise.all([promiseLoginAdmin, promiseLoginNonAdmin])
    .then((values) => {
      tokenAdmin = values[0].body.token
      tokenNonAdmin = values[1].body.token
      done()
    })
    .then(() => {
      return chai.request(app).post('/products').set('token', tokenAdmin).send(inputPost)
    })
    .then((res) => {
      productIdCreated = res.body._id
    })
    .catch((err) => {
      console.log(err)
    })
})

after(function() {
  deleteProductTesting()
})

describe('Admin Product CRUD', function() {
  describe('Create products list POST /products', function() {
    it('should have status 201 and properties: _id, name, description, stock, image, price, currency, category', function(done){
      chai
        .request(app)
        .post('/products')
        .set('token', tokenAdmin)
        .send(inputPost)
        .then((res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('description')
          expect(res.body).to.have.property('stock')
          expect(res.body).to.have.property('image')
          expect(res.body).to.have.property('price')
          expect(res.body).to.have.property('currency')
          expect(res.body).to.have.property('category')
          done()
        })
        .catch((err) => {
          console.log(err)
        })
    });
    it('should return status 401 message unauthorized for non admin user to create product', function(done) {
      chai
        .request(app)
        .post('/products')
        .set('token', tokenNonAdmin)
        .send(inputPost)
        .then((res) => {
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'Unauthorized')
          done()
        })
        .catch((err) => {
          console.log(err)
        })
    })
  });
  describe('Get list of products GET /products', function() {
    it('should have status 200 and properties _id, name, description, stock, image, price, currency, category', function(done){
      chai
        .request(app)
        .get('/products')
        .then((res) => {
          expect(res).to.have.status(200)
          expect(res.body[0]).to.have.property('_id')
          expect(res.body[0]).to.have.property('name')
          expect(res.body[0]).to.have.property('description')
          expect(res.body[0]).to.have.property('stock')
          expect(res.body[0]).to.have.property('image')
          expect(res.body[0]).to.have.property('price')
          expect(res.body[0]).to.have.property('currency')
          expect(res.body[0]).to.have.property('category')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    });
  });

  after(function() {
    describe('Update products list PUT /products', function() {
      it('should have status 201 and updated product detail if success', function(done) {
        chai
          .request(app)
          .put(`/products/${productIdCreated}`)
          .set('token', tokenAdmin)
          .send(inputPostUpdate)
          .then((res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('name', inputPostUpdate.name)
            expect(res.body).to.have.property('description', inputPostUpdate.description)
            expect(res.body).to.have.property('stock', inputPostUpdate.stock)
            expect(res.body).to.have.property('image', inputPostUpdate.image)
            expect(res.body).to.have.property('price', inputPostUpdate.price)
            expect(res.body).to.have.property('currency', inputPostUpdate.currency)
            expect(res.body).to.have.property('category', inputPostUpdate.category)
            done()
          })
          .catch((err) => {
            console.log(err)
          })
      })
      it('should have status 401 message Unauthorized for nonadmin to update product', function(done) {
        chai
          .request(app)
          .put(`/products/${productIdCreated}`)
          .set('token', tokenNonAdmin)
          .send(inputPostUpdate)
          .then((res) => {
            expect(res).to.have.status(401)
            expect(res.body).to.have.property('message', 'Unauthorized')
            done()
          })
          .catch((err) => {
            console.log(err)
          })
      })
    });
    describe('Delete products list DELETE /products', function() {
      it('should have successfull message if success', function(done) {
        chai
          .request(app)
          .delete(`/products/${productIdCreated}`)
          .set('token', tokenAdmin)
          .then((res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('message', 'successfully delete product')
            done()
          })
          .catch((err) => {
            console.log(err)
          })
      })
      it('should have status 401 message Unauthorized for nonadmin to delete product', function(done) {
        chai
          .request(app)
          .put(`/products/${productIdCreated}`)
          .set('token', tokenNonAdmin)
          .send(inputPostUpdate)
          .then((res) => {
            expect(res).to.have.status(401)
            expect(res.body).to.have.property('message', 'Unauthorized')
            done()
          })
          .catch((err) => {
            console.log(err)
          })
      })
    });
  })
})

