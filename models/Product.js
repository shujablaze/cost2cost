const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide a title"]
    },
    description:{
        type:String,
        required:[true,"Please provide a description"]
    },
    category:{
        type:String,
        required:[true,'Please enter category']
    },
    features:{
        type:String,
        required:[true,"Please provide features"]
    },
    img:String,
    discountprice:{
        type:Number,
        required:[true,"Please provide MSRP"]
    },
    originalprice:{
        type:Number,
        required:[true,"Please provide selling price"]
    },
});

const Product = mongoose.model('Product',productSchema)

module.exports = Product;

