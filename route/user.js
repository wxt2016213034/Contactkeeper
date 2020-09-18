const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator/check');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
//@route POST api/user

router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('email','Correct email plz').isEmail(),
    check('password','Password Plz').isLength({min:6})
],async (req,res) =>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(404).json({errors: errors.array()});
    }

    const {name, password, email} = req.body;
    
    try {
        var usertemp = await User.findOne({email});

        if(usertemp){
            res.status(400).json({msg:"email has already been used"});
        }

    } catch (error) {
        console.log(error);
    }
    
    const seed = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(password,seed);

    usertemp = new User({
        name:name,
        password:newpassword,
        email:email
    });

    await usertemp.save();

    res.send('completed!');
});

module.exports = router;