require('dotenv').config();
const fs = require('fs');
const path = require('path');

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.resolve(__dirname, 'certs/ca-certificate.crt')), // Ensure this points to the correct cert path
        rejectUnauthorized: true,
      },
      connectTimeout: 60000,
    },
  },
};



// require('dotenv').config();
// console.log(process.env.DB_NAME)
// module.exports={
//   "development": {
//     "username": process.env.DB_USER,
//     "password": process.env.DB_PASS,
//     "database": process.env.DB_NAME,
//     "host": process.env.DB_HOST,
//     "dialect": "mysql",
//     "ssl": 'true'
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }
