import path from 'path';
import { env } from "process";

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
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
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
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    }    
  },
};
