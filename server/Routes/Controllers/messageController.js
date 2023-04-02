const sqlite = require('sqlite3').verbose();
const path = require('path');
const url = require('url');

const db = new sqlite.Database(path.resolve(__dirname, './../../rooms.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });
class messageController {
    async getMessages(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM messages WHERE id = ${queryObject.id}`, [], (err, rows) => {
            console.log(rows)
            return res.json({ data: rows, status: 200 })
        })
    }

}
module.exports = new messageController;