const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator/check');
const User = require('../models/User');
const Contacts = require('../models/Contacts');
const bcrypt = require('bcryptjs');
//@route GET api/contacts

router.get('/', async(req,res) =>{
    const {id} = req.body;
    try {
        const contactsArray = await Contacts.find({user: id}).sort({date:-1});
        res.json(contactsArray);
    } catch (error) {
        res.status(400).json({msg:"wrong id"});
    }
});


//@route POST api/contacts

router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('email','Correct email plz').isEmail(),
    check('phone','phone is required').not().isEmpty()
],async(req,res) =>{
    const {id,name,email,phone} = req.body;

    try {
    User.findById(id);  
    } catch (error) {
        res.status(400).json({msg:"Wrong Id"});
    };

    new Contacts({
        user:id,
        name,
        email,
        phone
    }).save();

    res.json({msg:"Great！"});
});

//@route PUT api/contacts/:id

router.put('/:id',[
    check('name','name is required').not().isEmpty(),
    check('email','Correct email plz').isEmail(),
    check('phone','phone is required').not().isEmpty()
],async(req,res) =>{
   const {user,name,email,phone} = req.body;

   const id = req.params.id;

   const newContact = {user,name,email,phone};

   try {
       await Contacts.findByIdAndUpdate(id,{
           $set:newContact
       },{
           new: true
       });
   } catch (error) {
       console.log(error.message);
   }

   res.json(newContact);

});

//@route DELETE api/contacts/:id

router.delete('/:id',async(req,res) =>{
    try {
        await Contacts.findByIdAndRemove(req.params.id);
        res.json({msg:"succeed"});
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;