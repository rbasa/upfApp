let secrets;

try {
  secrets = require('../../secrets.json');
} catch (error) {
  secrets = {};
}
module.exports = {
  "development": {
    "username": process.env.DBUSER||secrets.username,
    "password": process.env.DBPASSWORD||secrets.password,
    "database": process.env.DBDB||secrets.db,
    "host": process.env.DBHOSTNAME||secrets.hostname,
    "dialect": "mysql",
    "port": 3306
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DBUSER||secrets.username,
    "password": process.env.DBPASSWORD||secrets.password,
    "database": process.env.DBDB||secrets.db,
    "host": process.env.DBHOSTNAME||secrets.hostname,
    "dialect": "mysql",
    "port": 3306
  }
}
console.log(module.exports.development)