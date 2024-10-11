const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/user_management', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// API routes
app.post('/api/register', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne(req.body);
    res.send(user);
});

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.put('/api/users/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: 'User updated' });
});

app.delete('/api/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
