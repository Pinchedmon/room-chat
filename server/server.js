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


let rooms = {
    1: [],
    2: [],
    3: [],
}
io.on('connection', (socket) => {
    let addedUser = false;
    socket.on('connect to room', (roomId, username) => {
        socket.leave(1)
        socket.leave(2)
        socket.leave(3);
        socket.join(roomId)
        rooms[roomId].push(username);
        io.to(`${socket.id}`).emit('connected to room', { message: "Вы подключены успешно" })
    })
    socket.on('new message', (data) => {
        db.all(`INSERT INTO messages (id, username, text) VALUES (?, ?, ?)`, [`${data.roomId}`, data.username, data.text], (err) => {
            if (err) {
                console.error(err);
            } else {
                io.to(data.roomId).emit('new message', {
                    username: socket.username,
                    message: { id: data.id, text: data.text, username: data.username }
                });
            }
        });
    });
    socket.on('add user', (data) => {
        const { username, roomId } = data
        if (addedUser) return;
        socket.username = username;

        addedUser = true;
        io.to(`${socket.id}`).emit('login', {
            numUsers: rooms[roomId].length
        });
        socket.broadcast.in(roomId).emit('user joined', {
            username: socket.username,
            numUsers: rooms[roomId].length
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
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: 0
            });
        }
    });
});
server.listen(port)
