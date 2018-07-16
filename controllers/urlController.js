var bcrypt = require('bcrypt')
var knex
var {body, validationResult} = require('express-validator/check')
if (process.env.NODE_ENV === 'production') {
  knex = require('knex')(require('../knexfile').production)
} else {
  knex = require('knex')(require('../knexfile').development)
}

exports.new = (req, res) => {
  res.render('newUrl')
}

exports.validate = [body('url').isURL()]

exports.create = (req, res) => {
  console.log(validationResult(req).array())
  res.json(req.body)
}

exports.findByHash = (req, res) => {
  res.json(req.body)
}
