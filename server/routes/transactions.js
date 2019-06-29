const express = require('express')
const router = express.Router()

const ControllerTransaction = require('../controllers/controller-transaction')
const { authentication, authorizationCustomer, authenticationAdmin } = require('../middlewares/author-authen')

router.use(authentication)
router.post('/', ControllerTransaction.createAddCart)
router.get('/', ControllerTransaction.readAllTransactionOneUser)
router.get('/cart', ControllerTransaction.readCart)
router.get('/alltrx', authenticationAdmin, ControllerTransaction.readAllTransaction)
router.use('/:id', authorizationCustomer)
router.get('/:id', ControllerTransaction.readOne)
router.put('/:id', ControllerTransaction.updateQuantity)
router.delete('/:id', ControllerTransaction.deleteOneProduct)
router.post('/:id/checkout', ControllerTransaction.checkout)

module.exports = router