const express = require('express');
// const Person = require('./models/Person')
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;
const db = require('./db/db');
const passport = require('./auth')
const bodyParser = require('body-parser');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/', function (req, res) {
    res.send('Welcome to our Hotel');
})

// Import the router files
const personRoutes = require('./routes/person.routes');
const menuItemRoutes = require('./routes/menuitem.routes');

// Use the routers
app.use('/person',localAuthMiddleware, personRoutes);
app.use('/menu', menuItemRoutes);
  
app.listen(port, ()=>{
    console.log('listening on port 3000');
})