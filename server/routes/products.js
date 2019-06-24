const express = require('express')
const router = express.Router()

const ControllerProduct = require('../controllers/controller-product')
const { authentication, authorizationAdmin } = require('../middlewares/author-authen')

router.get('/', ControllerProduct.readAllwFilter)
router.get('/:id', ControllerProduct.readOne)  
router.use(authentication)
router.post('/', ControllerProduct.create)
router.use('/:id', authorizationAdmin)
router.put('/:id', ControllerProduct.update)
router.delete('/:id', ControllerProduct.delete)

module.exports = router