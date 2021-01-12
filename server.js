const express = require('express');

const app=express();

app.get('/',(req,res)=>res.send('APP RUNNING..'));

//Define Routes
app.use('/api/scrapper',require('./routes/api/scrapper'));

const PORT = 5000;

app.listen(PORT, ()=>(
    console.log(`Server Statred on port ${PORT}`)
));

//Extract the 