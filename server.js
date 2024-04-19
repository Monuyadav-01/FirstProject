const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const db = require('./db/db');
const passport = require('./auth');
const bodyParser = require('body-parser');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
};
app.use(logRequest);

// Initialize Passport for authentication
app.use(passport.initialize());

// Define the authentication middleware
const authenticateMiddleware = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        // Authentication succeeded, proceed to the next middleware
        next();
    })(req, res, next);
};

// Apply the authentication middleware only for '/person' routes
// app.use(authenticateMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to our Hotel');
});

// Import the router files
const personRoutes = require('./routes/person.routes');
const menuItemRoutes = require('./routes/menuitem.routes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
