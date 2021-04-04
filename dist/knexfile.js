"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
console.log("database_url: " + process.env.DATABASE_URL);
module.exports = {
    development: {
        client: "pg",
        connection: {
            database: "dbteste",
            user: "postgres",
            password: "rob!123gi0840",
            port: 5432,
            host: "localhost",
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, "src", "database", "migrations"),
        },
        seeds: {
            directory: path_1.default.resolve(__dirname, "src", "database", "seeds"),
        },
        useNullAsDefault: true,
    },
    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    production: {
        client: "pg",
        connection: "postgres://lfohpdgzphqmnk:c8210d92f1abb31e690248697d35cbf27a03caa5a743c79d4aea725acc0cfa1a@ec2-18-233-83-165.compute-1.amazonaws.com:5432/da2n37al7cptee",
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, "src", "database", "migrations"),
        },
    },
};
