const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
//@route GET api/auth

router.get('/',async (req,res) =>{
    try {
        const {id} = req.body;
        try{
        var usertemp = await User.findById(id).select('-password');
        }catch(error){
        res.status(500).json({msg:"No ID"});

        }
        // if(!usertemp){
        //     res.status(400).json({msg:"wrong ID"});
        // }
        res.json({
            usertemp
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:"server Error"});
    }
});

//@route POST api/auth

router.post('/',[
    check('email','Correct email plz').isEmail(),
    check('password','Password Plz').isLength({min:6})
],async (req,res) =>{
    try {
        const {email,password} = req.body;
        let usertemp = await User.findOne({email});
        if(!usertemp){
            res.status(400).json({msg:"Wrong email"});
        }

        const isMatch = await bcrypt.compare(password,usertemp.password);

        if(!isMatch){
            res.status(400).json({msg:"Wrong password"});
        }

        res.json({
            id: usertemp.id
        })

    } catch (error) {
        console.log(error);
    }


});


module.exports = router;