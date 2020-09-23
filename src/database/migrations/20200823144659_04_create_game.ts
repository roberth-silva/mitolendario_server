import Knex from "knex";


export async function up(knex: Knex) {
    return knex.schema.createTable( 'games', table =>{
        table.increments('id').primary();
        table.string('description').notNullable();        
        
        table.integer('narrative_id')
        .notNullable()
        .references('id')
        .inTable('narratives');

        table.timestamps(true,true);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('games');
}

