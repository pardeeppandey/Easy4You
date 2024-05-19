const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const jwtsecret = "Mynameispardeeppandeyliveinludhiana$#"

router.post('/createuser', [
    body('name').isLength({ min: 5 }),
    body('email', 'incorrect email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })]
    , async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                mobilenumber: req.body.mobilenumber,
                address: req.body.address
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })
router.post('/loginuser', [
    body('email', 'incorrect email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ errors: 'Try logging with correct credentials' });
            }
            const pwdcompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdcompare) {
                return res.json({ errors: 'Try logging with correct credentials' });
            }
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authtoken = await jwt.sign(data, jwtsecret);
            return res.json({ success: true, authtoken: authtoken ,usertype: "user"});

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;