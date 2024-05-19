const express = require('express')

const router = express.Router();

const User = require('../models/Userhistory')

router.post('/userhistory', async (req, res) => {
    try {
        await User.create({
            source: req.body.source,
            destination: req.body.destination,
            totalDistance: req.body.totalDistance,
            fare: req.body.fare
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})
module.exports = router;
