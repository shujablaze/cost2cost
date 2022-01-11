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
        default:'No features listed'
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
},{ discriminatorKey: 'kind' });

const Product = mongoose.model('Product',productSchema)

module.exports = Product;

