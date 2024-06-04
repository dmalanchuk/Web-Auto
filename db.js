// database.js

const sqlite3 = require('sqlite3').verbose();

// Ініціалізація бази даних
// Використовуйте ':memory:' для тимчасової бази даних або вкажіть файл для збереження даних на диск
const db = new sqlite3.Database('db.sqlite3');


db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS participants (firstName TEXT, lastName TEXT, age INTEGER)");
});

module.exports = db;