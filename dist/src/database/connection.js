"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex = require('knex');
var knexfile = require('../../knexfile');
var env = process.env.NODE_ENV || 'production';
var configOptions = knexfile[env];
var connection = knex(configOptions);
//import path from 'path';
/*const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true
});*/
/*const connection = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex', 'public'],
  });*/
exports.default = connection;
