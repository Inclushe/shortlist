var app = require('./app')
console.log(process.env.DATABASE_URL)
var server = app.listen(process.env.PORT, () => {
  console.log(`Listening on ${server.address().port}`)
})
