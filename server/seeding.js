const axios = require('axios')

const User = require('./models/model-user')
const Product = require('./models/model-product')

// Reset all data

// User
let dataUser = [
  {
    full_name: 'Robby Caesar Putra',
    username: 'robbycp',
    password: 'robbycp',
    email: 'robby@mail.com',
    admin: true
  },
  {
    full_name: 'Testing',
    username: 'testing',
    password: 'testing',
    email: 'testing@mail.com',
    admin: false
  },
]

let product = [
  {
    name: '',
    description: '',
    stock: 8,
    image: ''
  }
]