const env = require('dotenv');
env.config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const messageRoute = require('./routes/messageRoute.js');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js');

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // to accept JSON data
app.use(cors());

// Define API routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoute);

// Serve static files from the React app in production
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, 'frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running..');
    });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, (err) => {
    if (err) console.error(err);
    // console.log(`Listening at PORT: ${PORT}`);
});

// Socket.io configuration
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'https://lets-chat-zeej.onrender.com',
    },
});

io.on('connection', (socket) => {
    // console.log('Connected to socket.io');
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        // console.log('User Joined Room: ' + room);
    });
    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        if (!chat.users) return // console.log('chat.users not defined');

        chat.users.forEach((user) => {
            if (user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit('message received', newMessageReceived);
        });
    });

    socket.off('setup', () => {
        // console.log('USER DISCONNECTED');
        socket.leave(userData._id);
    });
});
