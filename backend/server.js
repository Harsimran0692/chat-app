const express = require('express');
const env = require('dotenv');
const app = express();
const chats = require('./data/chats.js');
const connectDB = require('./config/db.js');

env.config();
// console.log('Mongo URI:', process.env.MONGO_URI);

connectDB();

app.get('/', (req, res) => {
    res.send("Home");
    res.end();
});
app.get('/api/chat', (req, res) => {
    res.send(chats)
});
app.get('/api/chat/:id', (req, res) => {
    // res.send(req)
    // console.log(req);
    const singleData = chats.map((data) => {
        if (data._id === req.params.id) {
            return data
        }
    })
    res.send(singleData);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log(`Listening at PORT: ${PORT}`);
});