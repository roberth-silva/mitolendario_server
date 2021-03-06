import knex from 'knex';

const knexfile = require('../../knexfile');

console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("DATABASE_URL", process.env.DATABASE_URL);

const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

const connection = knex(configOptions);

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

 

export default connection;