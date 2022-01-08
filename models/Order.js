const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    status:{
        type:String,
        default:'active'
    },
    title:{
        type:String,
        required:[true,"Please provide order title"]
    },
    orderDate:{
        type:Date,
        default:Date.now()
    },
    deliveryDate:{
        type:Date,
        default:null
    },
    buyerId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,"BuyerId is mandatory"]
    },
    buyerName:{
        type:String,
        required:[true,"An order must have a buyer"]
    },
    address:{
        type:String,
        required:[true,"Delivery address is required"]
    },
    phoneNo:{
        type:Number,
        required:[true,"Please provide contact number"],
        minLength:10,
        maxLength:12
    },
    amount: {
        type:Number,
        required:[true,"Please provide order amount"]
    },
    items:[{
        _id:false,
        productId:{
            type:mongoose.Schema.ObjectId,
            ref:'Product'
        },
        category:String,
        quantity:Number
    }]
})

const Order = mongoose.model('Order',orderSchema)

module.exports = Order