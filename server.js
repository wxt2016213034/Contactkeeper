const express = require('express');
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = express();

//Connect mongoDB
connectDB();

//Init Middleware json
app.use(express.json({extended: false}));

app.get('/', (req, res)=> res.json({ msg : "Hello world"}));

//user route
app.use('/api/user',require('./route/user'));
app.use('/api/contacts',require('./route/contacts'));
app.use('/api/auth',require('./route/auth'));

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));