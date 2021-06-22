const express = require('express');
const path = require('path');
const cookieParser=require('cookie-parser')

const pcController=require('./controllers/pcController');
const shelvesController=require('./controllers/shelvesController');
const {checkLoginStatus,protectedRoute}=require('./controllers/authController');
const userRouter=require('./routes/userRoutes');
const app = express();

// Parse req body to json 
app.use(express.json());

// To send and read cookies
app.use(cookieParser())

//Setting Views engine and base dir
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//Setting route for static files
app.use(express.static(path.join(__dirname,'/public')));

//Checking login status
app.use(checkLoginStatus);

app.use('/users',userRouter);

app.get('/',(req,res)=>res.render('index'))

app.get('/categories/:category',shelvesController.getProducts);

app.get('/categories/:category/:id',shelvesController.getProducts);

app.get('/:name',protectedRoute,pcController.getpc);

module.exports = app;



