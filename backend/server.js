// Express server for registration with MongoDB

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

const USERS_FILE = path.join(__dirname, 'users.json');

function readUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch {
        return [];
    }
}

function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}


// Registration endpoint
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields required' });
    }
    let users = readUsers();
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email already registered' });
    }
    users.push({ name, email, password });
    writeUsers(users);
    res.status(201).json({ message: 'Registration successful' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields required' });
    }
    let users = readUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // For demo: return user profile (no JWT/session)
    res.json({ name: user.name, email: user.email });
});

// Profile endpoint (demo: fetch by email)
app.get('/api/profile', (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: 'Email required' });
    }
    let users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ name: user.name, email: user.email });
});

app.listen(5000, () => console.log('Server running on port 5000'));
