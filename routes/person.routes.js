const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// import person model

const Person = require('../models/Person.js')

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data); // Ensure that Person model is correctly imported and defined
        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET METHOD TO TAKE DATA FROM USER

router.get('/', async(req, res) => {
    try {

        const data = await Person.find()
        console.log("find data");
        res.status(200).json({data})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
})

// APP DATA FROM WORK

router.get('/:work', async(req, res) => {
    try {
        const work = req.params.work
    if (work == 'chef' || work == 'manager' || work == 'waiter') {
        const response = await Person.find({ work: work })
        console.log("response fetched");
        res.status(200).json({response})
    }
    else {
        res.status(400).json({error : "Invalid work type"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
        
    }
})

module.exports = router
