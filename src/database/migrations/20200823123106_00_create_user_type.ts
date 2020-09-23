import Knex from "knex";


export async function up(knex: Knex) {
    return knex.schema.createTable('usertypes', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('usertypes');
}