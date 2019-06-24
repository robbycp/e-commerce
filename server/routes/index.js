const express = require('express')
const router = express.Router()

const routerUser = require('./users')
const routerProducts = require('./products')
const routerTransactions = require('./transactions')

router.use('/users', routerUser)
router.use('/products', routerProducts)
router.use('/transactions', routerTransactions)

module.exports = router