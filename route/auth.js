const express = require('express');
const router = express.Router();

//@route GET api/auth

router.get('/',(req,res) =>{
    res.send('get logged user');
});

//@route POST api/auth

router.post('/',(req,res) =>{
    res.send('Log in user');
});


module.exports = router;