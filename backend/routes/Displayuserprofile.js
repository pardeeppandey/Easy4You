const express = require('express');
const router = express.Router();
const fetchUser = require('../fetchUser'); 
const User = require('../models/User');

router.get('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password'); 
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
