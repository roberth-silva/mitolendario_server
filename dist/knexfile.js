"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path_1.default.resolve(__dirname, 'src', 'database', 'database.sqlite')
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, 'src', 'database', 'migrations')
        },
        seeds: {
            directory: path_1.default.resolve(__dirname, 'src', 'database', 'seeds')
        },
        useNullAsDefault: true,
    },
    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
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
            charset: 'utf8',
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, 'src', 'database', 'migrations')
        }
    }
};
