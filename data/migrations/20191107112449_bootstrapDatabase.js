
exports.up = function(knex) {
  return knex.schema.createTable('scpecies', tbl => {
      tbl.increments(); // the type of the Primary Key is integer without negative values, also called unsigned

      tbl.string('name', 255).notNullable();

  })
  .createTable('animals', tbl => {
      tbl.increments();

      tbl.string('name', 255).notNullable();

      //define our foreign keys
      tbl
      .integer('species_id')
      .unsigned()
      .refrences('id')
      .inTable('species')
      .onDelete('RESTRICT') // about deleting the primary key table. Could be 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'?
      .onUpdate('CASCADE'); //about changing the value of the primary key table

    // Q: we have bears and a few animals that are bears -- what should happen if I delete the record for a species that has animals?
    // A: depends on the reality of the owner of the system
  })
  .createTable('zoos', tbl => {
    tbl.increments();

    tbl.string('name', 255).notNullable();
    tbl.string('address', 512);
  })
  .createTable('animal_zoos', tbl =>{
      tbl.increments()

      tbl.string('name', 255).notNullable();
      tbl
      .integer('zoo_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('zoos')
      .onDelete('RESTRICT') // about deleting the primary key table. Could be 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'?
      .onUpdate('CASCADE');
      tbl
      .integer('animal_id')
      .notNullable()
      .unsigned()
      .references('id')
      inTable('animals')
      .onDelete('RESTRICT') // about deleting the primary key table. Could be 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'?
      .onUpdate('CASCADE');

      tbl.date('from').notNullable();
      tbl.date('to');

  })
};

exports.down = function(knex) {
  dropTableIfExists('animal_zoos');
  dropTableIfExists('animals');
  dropTableIfExists('zoos');
  dropTableIfExists('species');
};
