const express = require('express'),
    app = express(),
    cors = require('cors'),
    http = require('http'),
    path = require('path'),
    sqlite = require('sqlite3').verbose(),
    { Server } = require("socket.io"),
    db = new sqlite.Database(path.resolve(__dirname, './rooms.db')),
    port = 6060,
    server = http.createServer(app),
    io = new Server(server, {
        cors: "localhost:3000",
        serveClient: true
    }),
    messageRouter = require('./Routes/messageRouter'),
    roomsRouter = require('./Routes/roomsRouter');
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({}))

app.use('/message', messageRouter)
app.use('/rooms', roomsRouter)

let numUsers = 0;
io.on('connection', (socket) => {
    let addedUser = false;
    socket.on('new message', (data) => {
        db.all(`INSERT INTO messages (id, name, message) VALUES (?, ?, ?)`, [data.id, data.name, data.message], (err) => {
            if (err) {
                console.error(err);
            } else {
                socket.broadcast.emit('new message', {
                    username: socket.username,
                    message: data
                });
            }
        });
    });
    socket.on('add user', (username) => {
        if (addedUser) return;
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});
server.listen(port)
