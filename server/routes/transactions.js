const express = require('express')
const router = express.Router()

const ControllerTransaction = require('../controllers/controller-transaction')
const { authentication, authorizationCustomer } = require('../middlewares/author-authen')

router.use(authentication)
router.post('/', ControllerTransaction.createAddCart)
router.get('/', ControllerTransaction.readAllwFilter)
router.use('/:id', authorizationCustomer)
router.get('/:id', ControllerTransaction.readOne)
router.delete('/:id', ControllerTransaction.delete)

module.exports = router