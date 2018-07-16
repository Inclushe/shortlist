module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_URL,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'shortlist'
    }
  }
}
