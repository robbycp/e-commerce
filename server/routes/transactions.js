const express = require('express')
const router = express.Router()

const ControllerTransaction = require('../controllers/controller-transaction')
const { authentication, authorizationCustomer, authorizationAdmin } = require('../middlewares/author-authen')

router.use(authentication)
router.post('/', ControllerTransaction.createAddCart)
router.get('/', ControllerTransaction.readAllTransactionOneUser)
router.get('/alltrx', authorizationAdmin, ControllerTransaction.readAllTransaction)
router.use('/:id', authorizationCustomer)
router.get('/:id', ControllerTransaction.readOne)
router.delete('/:id', ControllerTransaction.delete)
router.post('/:id/checkout', ControllerTransaction.checkout)

module.exports = router