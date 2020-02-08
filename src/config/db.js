const Loki = require('lokijs');

const db = new Loki('FabelioMonitoringDB.db', {
  autoload: true,
  autosave: true,
  autosaveInterval: 4000,
});

module.exports = db;
