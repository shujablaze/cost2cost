const express = require('express');
const path = require('path');
const cookieParser=require('cookie-parser')

const pcController=require('./controllers/pcController');
const productController=require('./controllers/productController');
const {checkLoginStatus,protectedRoute}=require('./controllers/authController');
const userRouter=require('./routes/userRoutes');
const cartRouter=require('./routes/cartRoutes');
const adminRouter = require('./routes/adminRoutes')
const orderRouter = require('./routes/orderRoutes')
const app = express();

// Parse req body to json 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

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

app.use('/admin',adminRouter)

app.use('/cart',protectedRoute,cartRouter);

app.use('/orders',protectedRoute,orderRouter)

app.get('/',(req,res)=>res.render('index'))

app.get('/categories/:category',productController.getCategoryProducts);

app.get('/categories/:category/:id',productController.getProduct);

app.get('/:name',pcController.getpc);

const errorHandler = (err,req,res,next) => {

    res.status('500').json({
        status:'error',
        message:err.message
    })
}

app.use(errorHandler)

module.exports = app;



