let secrets;

try {
  secrets = process.env.remoteDB ? require('../../secrets.json') : require('../../localDb.json');
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
    "port": process.env.PORT||secrets.port
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
