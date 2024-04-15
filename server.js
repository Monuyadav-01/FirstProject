const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT||3000;
const db = require('./db/db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Corrected the invocation of bodyParser
//Import menuitem model 

app.get('/', (req, res) => res.send("Welcome to our hotel, please order food!"));





// import person routes
const personRoutes = require('./routes/person.routes.js')
app.use('/person' , personRoutes)
// import menu routes
const menuRoutes = require('./routes/menuitem.routes.js')
app.use('/menu',menuRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
