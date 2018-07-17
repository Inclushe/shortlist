// var bcrypt = require('bcrypt')
var crypto = require('crypto')
var knex
var {body, validationResult} = require('express-validator/check')
if (process.env.NODE_ENV === 'production') {
  knex = require('knex')(require('../knexfile').production)
} else {
  knex = require('knex')(require('../knexfile').development)
}
var keynames = require('../lib/wordlist.json')

exports.new = (req, res) => {
  res.render('newUrl')
}

exports.validate = [body('url').isURL().withMessage('Please enter a valid URL.')]

exports.create = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    var urlHash = []
    for (var i = 0; i < 3; i++) {
      var buffer = crypto.randomBytes(2)
      var randomInteger = ((buffer[0] << 8) + (buffer[1])) >> 4
      urlHash.push(keynames[randomInteger])
    }
    knex('url')
      .insert({
        url: req.body.url,
        hash: urlHash.join('-'),
        created_at: Date.now(),
        edited_at: Date.now()
      })
      .then(() => {
        var mnemonicURL = req.get('host') + '/' + urlHash.join('-')
        res.json({mnemonicHash: urlHash.join('-'), mnemonicURL: mnemonicURL, errors: []})
      })
      .catch((e) => {
        next(e)
      })
  } else {
    res.json({errors: validationResult(req).array()})
  }
}

exports.findByHash = (req, res, next) => {
  knex('url')
    .where({hash: req.params.hash})
    .then((rows) => {
      if (rows.length !== 0) {
        res.redirect(rows[0].url)
      } else {
        res.send('No URL found here.')
      }
    })
    .catch((e) => {
      next(e)
    })
}
