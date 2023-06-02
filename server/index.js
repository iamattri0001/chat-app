const expres = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes')
const messageRoutes = require("./routes/messageRoutes");

require('dotenv').config();

const socket = require('socket.io');


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected to DB'))
    .catch(err => console.log(err));

const app = expres();
app.use(cors());
app.use(expres.json());

const server = app.listen(process.env.PORT, () => {
    console.log('server started at port ', process.env.PORT);
});


app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);



const io = socket(server, {
    cors: {
        origin: process.env.ORIGIN,
        credetials: true
    }
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    })

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        // console.log(data);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-receive', { message: data.message, from: data.from });
        }
    })
})