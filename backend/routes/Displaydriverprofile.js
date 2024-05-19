const express = require('express');
const router = express.Router();
const fetchUser = require('../fetchUser'); 
const Driver = require('../models/Driver');

router.get('/getdriver', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Driver.findById(userId).select('-password'); 
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
