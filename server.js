const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 7025;

// MongoDB connection string
const dbURI = 'mongodb://localhost:27017/bookrecipe';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    cuisine: { type: String },
    experience: { type: String }
});

const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, phone, password, cuisine, experience } = req.body;

        // Create a new user with the plain text password
        const newUser = new User({
            name,
            email,
            phone,
            password, // No hashing here, storing the plain text password
            cuisine,
            experience
        });

        await newUser.save();
        res.status(201).send('User registered successfully!');
    } catch (err) {
        console.error(err);
        res.status(400).send('Error registering user: ' + err.message);
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            // If user not found
            return res.status(400).json({ message: 'Invalid user' });
        }

        // Compare the plain text password
        if (user.password !== password) {
            // If password doesn't match
            return res.status(400).json({ message: 'Invalid user' });
        }

        // Success: user exists and password is correct
        res.json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
