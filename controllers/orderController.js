const Order = require('../models/Order')
const User = require('../models/User')
const Product = require('../models/Product')


const createOrderObject = async(user) =>{
    const order = {}
    //Populating Order object
    order["buyerId"] = user._id
    order["buyerName"] = user.name
    order["address"] = user.address
    order["phoneNo"] = user.phoneNo
    order["items"] = user.cart
    order["amount"] = 0
    order["title"] = ""

    //Calculating Order total
    for (const product of order["items"]){
        const item = await Product.findById(product.productId)
        order.amount += (item.discountprice * product.quantity)
        //eg 1xram, 
        order.title += `${product.quantity} x ${item.title}, `
    }
    if(order["title"].length > 102){
        //Limiting length of title to 30
        order["title"] = `${order["title"].slice(0,100)}...`
    }else{
        //Removing trailing , and whitespace
        order["title"] = order["title"].slice(0,-2)
    }

    return order
}

exports.checkout = async(req,res,next) => {
    try{
        const {userId} = req.body

        const user = await User.findById(userId)

        if(!user){
            next(new Error('Invalid User'))
            return
        }

        if(user.profileStatus !== 'complete'){
            res.redirect('/users/profile/info')
            return
        }

        const order = await createOrderObject(user)

        //Resetting cart
        user.cart = []
        await User.findByIdAndUpdate(userId,user)

        const placedOrder = await Order.create(order)

        res.redirect(`/orders/order/${placedOrder._id}`)

    }catch(err){
        next(err)
    }
}

exports.getAllOrders = async(req,res,next) => {
    try{
        const orders = await Order.find({})

        res.status('200').render('orders',{data:orders})

    }catch(err){
        next(err)
    }
}

exports.getBuyersOrder = async(req,res,next) => {
    try{
        const {userId} = res.locals

        const orders = await Order.find({buyerId:userId})

        res.status('200').render('orders',{data:orders})
        
    }catch(err){
        next(err)
    }
}

exports.getOrder = async(req,res,next) => {
    try{
        const {orderId} = req.params

        const order = await Order.findById(orderId).populate('items.productId')

        res.status('200').render('order',{data:order})

    }catch(err){
        next(err)
    }
}

exports.markOrderDelivered = async(req,res,next) => {
    try{
        const {orderId} = req.body

        const order = await Order.findById(orderId)

        if(!order.status === 'active'){
            return next(new Error(`Order has been ${order.status}`))
        }

        order.status = "delivered";
        order.deliveryDate = Date.now()

        await order.save()
        
        res.status('200').json({
            status:'ok'
        })
    }catch(err){
        next(err)
    }
}

exports.cancelOrder = async(req,res,next) => {
    try{
        const {orderId} = req.body

        const order = await Order.findById(orderId)

        if(!order.status === 'active'){
            return next(new Error(`Order has been ${order.status}`))
        }

        order.status = "cancelled";
        await order.save()
        
        res.status('200').json({
            status:'ok'
        })

    }catch(err){
        next(err)
    }
}