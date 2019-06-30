const Product = require('../models/model-product')
const { deleteFile } = require('../helpers/image')

class ControllerArticle {
  static create(req, res, next) {
    console.log(' masuk create product', req.body)
    let newProduct = {
      name: req.body.name,
      description: req.body.description,
      stock: req.body.stock,
      image: (req.file) ? req.file.gcsUrl : '',
      price: req.body.price,
      currency: req.body.currency,
      category: req.body.category
    }
    Product.create(newProduct)
      .then((createdProduct) => {
        res.status(201).json(createdProduct)
      })
      .catch(next)
  }

  static readAllwFilter(req, res, next) {
    let schemaField = Object.keys(Product.prototype.schema.paths)
    let filteredField = Object.keys(req.body).filter((x) => schemaField.indexOf(x) > -1)
    let query = filteredField.reduce((acc, el) => Object.assign(acc, {[el]: req.body[el]}), {})

    Product.find(query)
      .then((products) => {
        res.status(200).json(products)
      })
      .catch(next)
  }
  
  static readOne(req, res, next) {
    Product.findById(req.params.id)
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(next)
  }
  
  static update(req, res, next) {
    console.log('masuk ke update', req.body)
    let updatedProduct = null
    Product.findById(req.params.id)
      .then((product) => {
        Object.keys(req.body).forEach(key => {
          product[key] = req.body[key]
        })
        updatedProduct = product
        if (req.file) {
          let filename = product.image.split('/')
          return deleteFile(filename[filename.length - 1])
        }
      })
      .then(()=>{
        if (req.file) {
          updatedProduct.image = req.file.gcsUrl
        }
        return updatedProduct.save()
      })
      .then((product) => {
        res.status(201).json(product)
      })
      .catch(next)
  }
  
  static delete(req, res, next) {
    let id = req.params.id
    Product.findById(id)
      .then((article) => {
        if (!article) throw { code: 404 }
        else {
          return Product.deleteOne({ _id: id})
        } 
      })
      .then((data) => {
        res.status(201).json({
          message: 'successfully delete product'
        })
      })
      .catch(next)
  }  
}

module.exports = ControllerArticle