const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.json()); 
const MenuItem = require('./../models/MenuItem.js')

// POST METHOD TO SEND MENU DATA TO SERVER
router.post('/', async(req, res) => {
    try {
        const menudata = req.body
        const newMenuItem = new MenuItem(menudata)
        const response = await newMenuItem.save()
        console.log("menu data saved");
        res.status(200).json({response})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})
// GET DATA FROM SERVER FROM SERVER
router.get('/', async(req ,res) => {
    try {

    const menuData = await MenuItem.find()
    console.log('find data');
    res.status(200).json({menuData})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
        
    }
})

module.exports = router
