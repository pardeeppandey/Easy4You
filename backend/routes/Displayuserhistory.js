const express = require('express')
const router = express.Router();

router.post('/displayuserhistory',(req,res)=>{
    try {
        res.send([global.userhistories])
    } catch (error) {
        console.error(error.message)
        res.send("server error")
    }
});

module.exports = router;