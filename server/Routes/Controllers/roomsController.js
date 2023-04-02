const sqlite = require('sqlite3').verbose();
const path = require('path');
const url = require('url');

const db = new sqlite.Database(path.resolve(__dirname, './../../rooms.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });
class roomsController {
    async getRooms(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM rooms`, [], (err, rows) => {
            return res.json({ data: rows, status: 200 })
        })
    }

}
module.exports = new roomsController;