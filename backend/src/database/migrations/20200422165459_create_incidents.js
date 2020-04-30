exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('img').notNullable();
        table.decimal('value').notNullable();

        table.string('pessoa_id').notNullable();

        table.foreign('pessoa_id').references('id').inTable('pessoa');
    });
 };

exports.down = function(knex) {
  return knex.schema.dropTable('incidents'); 
};
