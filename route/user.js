const express = require('express');
const router = express.Router();

//@route POST api/user
router.post('/',(req,res) =>{
    res.send('Register a user');
});

module.exports = router;