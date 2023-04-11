const sqlite = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite.Database(path.resolve(__dirname, './rooms.db'))

// const sql = ` CREATE TABLE rooms (ID INTEGER PRIMARY KEY AUTOINCREMENT, name);`
// db.run(sql)
//db.run(`DROP TABLE messages`)
// db.run(`INSERT INTO rooms (name) VALUES (?)`, ["Третья кладовая"])
db.run(`CREATE TABLE messages (id INTEGER, username, text, date)`)