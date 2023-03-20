const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("DB is already initialized.");
    return callback(null, _db);
  }
  mongoose
    .connect(process.env.CONNECTIONSTRING)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("DB not initialized.");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
