var app = require('./app')
var server = app.listen(3444, () => {
  console.log(`Listening on ${server.address().port}`)
})