const sqlite = require('sqlite3').verbose();
const path = require('path');


const db = new sqlite.Database(path.resolve(__dirname, './../../rooms.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });
class roomsController {
    async getRooms(req, res) {
        db.all(`SELECT * FROM rooms`, [], (err, rows) => {
            for (let i = 0; i < rows.length; i++) {
                db.all(`SELECT date, text FROM messages WHERE id = '${i + 1}' ORDER BY date DESC LIMIT 1`, [], (err, msg) => {

                    rows[i]['msgTime'] = msg[0] ? msg[0].date : ''
                    rows[i]['msgText'] = msg[0] ? msg[0].text : ''
                    if (i == rows.length - 1) {
                        return res.json({ data: rows, status: 200 })
                    }
                })
            }
        })
    }

}
module.exports = new roomsController;