import Knex from "knex";


export async function up(knex: Knex) {
    return knex.schema.createTable( 'historys', table =>{
        table.increments('id').primary();
        table.string('description').notNullable();
        table.string('game').notNullable();        
        
        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users');

        table.timestamps(true,true);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('historys');
}

