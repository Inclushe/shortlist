var express = require('express')
var router = express.Router()
var baseController = require('../controllers/baseController')
var urlController = require('../controllers/urlController')

router.get('/', baseController.viewHomePage)
router.get('/url/new', urlController.new)
router.post('/url/new', urlController.validate, urlController.create)
router.get('/:hash', urlController.findByHash)

module.exports = router
