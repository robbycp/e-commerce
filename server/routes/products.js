const express = require('express')
const router = express.Router()

const { multer, sendUploadToGCS } = require('../helpers/image')
const ControllerProduct = require('../controllers/controller-product')
const { authenticationAdmin } = require('../middlewares/author-authen')

router.get('/', ControllerProduct.readAllwFilter)
router.get('/:id', ControllerProduct.readOne)  
router.use(authenticationAdmin)
router.post('/', multer.single('image'), sendUploadToGCS, ControllerProduct.create)
router.put('/:id', multer.single('image'), sendUploadToGCS, ControllerProduct.update)
router.delete('/:id', ControllerProduct.delete)

module.exports = router