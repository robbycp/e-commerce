const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app.js')
const { deleteProduct } = require('../helpers/delete-data')

chai.use(chaiHttp)

const expect = chai.expect;
var tokenAdmin, tokenNonAdmin
var productIdCreated
var inputPost = {
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
    .catch((err) => {
      console.log(err)
    })
})

after(function() {
  deleteProduct()
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
          productIdCreated = res.body._id
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
  //   it('should return status 401 message unauthorized for non admin user to create product', function(done) {
  //     chai
  //       .request(app)
  //       .post('/products')
  //       .set('token', tokenNonAdmin)
  //       .send(inputPost)
  //       .then((res) => {
  //         productIdCreated = res.body._id
  //         expect(res).to.have.status(401)
  //         expect(res.body).to.have.message('message', 'Unauthorized')
  //         done()
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   })
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
    // describe('Get one products GET /products', function() {
    //   it('should have status 200 and properties _id, name, description, stock, image, price, currency, category', function(done){
    //     chai
    //       .request(app)
    //       .get(`/products/${productIdCreated}`)
    //       .then((res) => {
    //         expect(res).to.have.status(200)
    //         expect(res.body[0]).to.have.property('_id')
    //         expect(res.body[0]).to.have.property('name')
    //         expect(res.body[0]).to.have.property('description')
    //         expect(res.body[0]).to.have.property('stock')
    //         expect(res.body[0]).to.have.property('image')
    //         expect(res.body[0]).to.have.property('price')
    //         expect(res.body[0]).to.have.property('currency')
    //         expect(res.body[0]).to.have.property('category')
    //         done()
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //   });
    // });
    describe('Update products list PUT /products', function() {
      it('should have status 201 and updated product detail if success', function(done) {
        let inputPost = {
          name: 'Topi Hijrah edit',
          description: 'Topi hijrah cocok untuk hijrah style edit',
          stock: [{
            typeStock: 'all-size',
            amount: 35
          }],
          image: '',
          price: 10000,
          currency: 'IDR',
          category: 'accessories'
        }
        chai
          .request(app)
          .put(`/products/${productIdCreated}`)
          .set('token', tokenAdmin)
          .send(inputPost)
          .then((res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('name', inputPost.name)
            expect(res.body).to.have.property('description', inputPost.description)
            expect(res.body.stock[0].typeStock).to.equal(inputPost.stock[0].typeStock)
            expect(res.body.stock[0].amount).to.equal(inputPost.stock[0].amount)
            expect(res.body).to.have.property('image', inputPost.image)
            expect(res.body).to.have.property('price', inputPost.price)
            expect(res.body).to.have.property('currency', inputPost.currency)
            expect(res.body).to.have.property('category', inputPost.category)
            done()
          })
          .catch((err) => {
            console.log(err)
          })
      })
      // it('should have status 401 message Unauthorized for nonadmin to update product', function(done) {
      //   let inputPost = {
      //     name: 'Topi Hijrah edit',
      //     description: 'Topi hijrah cocok untuk hijrah style edit',
      //     stock: [{
      //       typeStock: 'all-size',
      //       amount: 35
      //     }],
      //     image: '',
      //     price: 10000,
      //     currency: 'IDR',
      //     category: 'accessories'
      //   }
      //   chai
      //     .request(app)
      //     .put(`/products/${productIdCreated}`)
      //     .set('token', tokenAdmin)
      //     .send(inputPost)
      //     .then((res) => {
      //       expect(res).to.have.status(401)
      //       expect(res.body).to.have.message('message', 'Unauthorized')
      //       done()
      //     })
      //     .catch((err) => {
      //       console.log(err)
      //     })
      // })
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
    });
  })
})
