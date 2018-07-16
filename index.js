var app = require('./app')
var server = app.listen(process.env.PORT, () => {
  console.log(`Listening on ${server.address().port}`)
})
