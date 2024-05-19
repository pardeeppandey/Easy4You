const express = require('express')
const { body, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/Comment')

router.post('/usercomment', [
    body('name').isLength({ min: 5 }),
    body('email', 'incorrect email').isEmail(),
    body('mobilenumber', 'incorrect mobile_number').isLength({ min: 10 }),
    body('comment').isLength({ min: 5 })]
    , async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                mobilenumber: req.body.mobilenumber,
                comment: req.body.comment
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })
module.exports = router;
