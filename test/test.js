var assert = require('assert')
var request = require('request')
var util = require('util')
var app = require('../app')
var server
var promisify = util.promisify

before(function (done) {
  server = app.listen('3444', done)
})

describe('Express', function () {
  it('root path should respond with "Hello world!"', function () {
    return promisify(request.get)('http://localhost:3444')
      .then((data) => {
        return assert.strictEqual(data.body, 'Hello world!')
      })
  })
})

after(function (done) {
  server.close(done)
})
