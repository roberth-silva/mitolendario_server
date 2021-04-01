"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var knexfile = require('../../knexfile');
console.log(process.env.NODE_ENV);
console.log(process.env.DATABASE_URL);
var env = process.env.NODE_ENV || 'development';
var configOptions = knexfile[env];
var connection = knex_1.default(configOptions);
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
