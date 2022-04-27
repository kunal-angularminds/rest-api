const router = require('express').Router();
const User = require('../model/User');
const { registerUser, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');

// validation
// const Joi = require('joi');

router.post("/register", async (req, res) => {


    // validating the user
    const { error, value } = registerUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already Exist");

    // hash password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

    // creating and saving the user
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        let savedUser = await user.save();
        res.send({user:savedUser._id});
    } catch (err) {
        res.status(400).send(err)
    }

});

router.post("/login",async(req,res)=>{
    // validating the user
    const { error, value } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // checking if the user exist or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email doesn't Exist");
    
    // checking if password is correct or not
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid Password");

    res.send("logged in!");

})

module.exports = router;