const express = require('express')
const router = express.Router();

router.post('/displaydriverhistory',(req,res)=>{
    try {
        res.send([global.driverhistories])
    } catch (error) {
        console.error(error.message)
        res.send("server error")
    }
});

module.exports = router;