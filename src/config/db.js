const Loki = require('lokijs');

const db = new Loki('FabelioMonitoringDB.db', {
  autoload: true,
  autosave: true,
  autosaveInterval: 4000,
});
exports.db = db;

exports.products = () => {
  let products = db.getCollection('products');
  if (!products) {
    products = db.addCollection('products');
  }
  return products;
};
