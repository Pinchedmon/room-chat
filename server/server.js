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
    socket.on('connect to room', (data) => {
        addedUser = false
        const { username, roomId } = data

        socket.leave(1)
        socket.leave(2)
        socket.leave(3);
        if (socket.roomId !== roomId) {
            socket.broadcast.in(socket.roomId).emit('user left', {
                username: socket.username,
            });

            for (let i = 1; i <= 3; i++) {
                let x = rooms[i].indexOf(socket.username);
                if (x >= 0) {
                    rooms[i].splice(x, 1);
                }
            }

        }
        socket.username = username
        socket.roomId = roomId

        socket.join(roomId)

        if (!addedUser) rooms[roomId].push(username);
        addedUser = true;
        io.to(`${socket.id}`).emit('login', {
            numUsers: rooms[roomId].length
        });
        socket.broadcast.in(roomId).emit('user joined', {
            username: socket.username,
            numUsers: rooms[roomId].length,

        });
        io.to(`${socket.id}`).emit('connected to room', { message: "Вы подключены успешно", users: rooms[roomId] })
    })
    // socket.on('leave room', (data) => {
    //     const { username, roomId } = data
    //     socket.broadcast.in(roomId).emit('user left', {
    //         username: socket.username,
    //     });
    // })
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

    socket.on('typing', () => {
        socket.broadcast.in(socket.roomId).emit('typing', {
            username: socket.username,

        });
    });
    socket.on('stop typing', () => {
        socket.broadcast.in(socket.roomId).emit('stop typing', {
            username: socket.username,

        });
    });
    socket.on('disconnect', () => {
        for (let i = 1; i <= 3; i++) {
            let x = rooms[i].indexOf(socket.username);
            if (x >= 0) {
                rooms[i].splice(x, 1);
            }
        }
        if (addedUser) {
            socket.broadcast.emit('user left', {
                username: socket.username,
            });
        }
    });
});

server.listen(port)
