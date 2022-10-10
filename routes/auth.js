const Joi = require("Joi");
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require("express");
const {User} = require("../models/user");

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid Email or Password.');

    const isPassValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPassValid) return res.status(400).send('Invalid Email or Password.');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
}

module.exports = router;