var express = require('express')
var router = express.Router()
var baseController = require('../controllers/baseController')

router.get('/', baseController.viewHomePage)

module.exports = router
