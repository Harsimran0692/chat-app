const env = require('dotenv');
env.config();

const express = require('express');
const app = express();
const chats = require('./data/chats.js');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js');

connectDB();

app.use(express.json()); // to accept json data

app.get('/', (req, res) => {
    res.send("Home");
    res.end();
});
app.use('/api/chat', userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log(`Listening at PORT: ${PORT}`);
});