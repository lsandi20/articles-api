require('dotenv').config()

module.exports = {
  "development": {
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "port": process.env.DB_PORT,
    "dialect": "postgres"
  },
  "test": {
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "port": process.env.DB_PORT,
    "dialect": "postgres"
  },
  "production": {
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "port": process.env.DB_PORT,
    "dialect": "postgres"
  }
}
