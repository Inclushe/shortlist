module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'shortlist',
      ssl: true
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
}
