const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/cost2cost',{
useNewUrlParser:true,
useCreateIndex:true,
useFindAndModify:false,
useUnifiedTopology:true})
.then(con=>{console.log("DB connected")});

const port = process.env.PORT
let host = '192.168.0.110'
if(process.env.NODE_ENV="DEV"){
    host='localhost'
}

app.listen(port,host,()=>{
    console.log(`Listening to port ${port}`);
});


