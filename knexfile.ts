//import path from 'path';

module.exports = {
    development: {
        client: 'sqlite3',
        connection:{
            //filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
        },
        migrations:{
            //directory: path.resolve(__dirname,'src','database','migrations')
        },
        seeds:{
            //directory: path.resolve(__dirname,'src','database','seeds')
        },
        useNullAsDefault: true,
    },
    staging: {
        client: 'postgresql',
        connection: {
          database: 'my_db',
          user:     'username',
          password: 'password'
        },
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: 'knex_migrations'
        }
    },
    production: {
        client: 'pg',
        connection: {
            url: process.env.DATABASE_URL,
            /*host : 'ec2-18-233-83-165.compute-1.amazonaws.com',
            user : 'lfohpdgzphqmnk',
            password : 'c8210d92f1abb31e690248697d35cbf27a03caa5a743c79d4aea725acc0cfa1a',
            port: 5432,
            database : 'da2n37al7cptee',
            charset: 'utf8',*/
            ssl: true
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path.resolve(__dirname,'src','database','migrations')
        }
    }  
};