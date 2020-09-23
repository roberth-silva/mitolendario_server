import Knex from "knex";


export async function up(knex: Knex) {
    return knex.schema.createTable( 'answers', table =>{
        table.increments('id').primary();
        table.string('description').notNullable();
        table.string('status').notNullable();
        
        table.integer('question_id')
        .notNullable()
        .references('id')
        .inTable('questions');

        table.timestamps(true,true);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('answers');
}

