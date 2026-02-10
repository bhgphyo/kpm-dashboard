const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'kpm_data.sqlite');

function initDb() {
  const db = new sqlite3.Database(DB_PATH);
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_name TEXT,
      mime TEXT,
      path TEXT,
      type TEXT,
      content TEXT,
      uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  });
  db.close();
}

function insertFile({ original_name, mime, path: filePath, type = 'file', content = null }) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    const stmt = `INSERT INTO files (original_name, mime, path, type, content) VALUES (?,?,?,?,?)`;
    db.run(stmt, [original_name, mime, filePath, type, content], function (err) {
      if (err) return reject(err);
      const id = this.lastID;
      db.get('SELECT * FROM files WHERE id = ?', [id], (e, row) => {
        db.close();
        if (e) return reject(e);
        resolve(row);
      });
    });
  });
}

function listFiles() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    db.all('SELECT * FROM files ORDER BY uploaded_at DESC', (err, rows) => {
      db.close();
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function getFileById(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    db.get('SELECT * FROM files WHERE id = ?', [id], (err, row) => {
      db.close();
      if (err) return reject(err);
      resolve(row);
    });
  });
}

module.exports = { initDb, insertFile, listFiles, getFileById };
