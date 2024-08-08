const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Models
const { User, Thought } = require('./models');

// User Routes
app.post('/users', async (req, res) => {
    try {
        const { username, email, friendCount } = req.body;
        const user = new User({ username, email, friendCount });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Thought Routes
app.post('/thoughts', async (req, res) => {
    try {
        const { text, username, reactions } = req.body;
        const thought = new Thought({ text, username, reactions });
        await thought.save();
        res.status(201).send(thought);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).send(thoughts);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});