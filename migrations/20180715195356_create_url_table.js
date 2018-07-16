
exports.up = function (knex, Promise) {
  return knex.schema.createTable('url', (table) => {
    table.increments('id').unsigned().notNullable()
    table.string('url').notNullable()
    table.string('hash').notNullable()
    table.string('created_at').notNullable()
    table.string('edited_at').notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('url')
}
