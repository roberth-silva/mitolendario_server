import Knex from "knex";


export async function up(knex: Knex) {
    return knex.schema.createTable( 'questions', table =>{
        table.increments('id').primary();
        table.string('description').notNullable();
        table.string('status').notNullable();
        
        table.integer('game_id')
        .notNullable()
        .references('id')
        .inTable('games');

        table.timestamps(true,true);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('questions');
}

