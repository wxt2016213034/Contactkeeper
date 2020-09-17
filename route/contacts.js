const express = require('express');
const router = express.Router();

//@route GET api/contacts

router.get('/',(req,res) =>{
    res.send('Get all contacts');
});


//@route POST api/contacts

router.post('/',(req,res) =>{
    res.send('Add contact');
});

//@route PUT api/contacts/:id

router.put('/:id',(req,res) =>{
    res.send('Update contact');
});

//@route DELETE api/contacts/:id

router.delete('/:id',(req,res) =>{
    res.send('delete contact');
});

module.exports = router;