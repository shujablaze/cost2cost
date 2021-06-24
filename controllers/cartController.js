const User = require('../models/User');
const { getItem } = require('./productController') 

exports.updateCart = async (req,res)=>{

    const {productId,productCategory} = req.body
    
    const allowedCategories = ['gamingchairs','cpu','ram','gpu','motherboard','pc','accessories']

    if(allowedCategories.indexOf(productCategory)===-1){
        console.log('INVALID CATEGORY RECEIVED AT '+ new Date().toLocaleString())
        return
    }

    const cartItem = {productId:productId,category:productCategory,quantity:1}

    const userId = res.locals.userId

    /*let user = await User.findById(userId)

    if(user){
        user.cart.push(cartItem)
        user = await user.save({validateBeforeSave:false})
    }*/

    const user = await User.findOneAndUpdate({_id:userId},{$addToSet:{cart:cartItem}},{new:true})

    res.status('200').json({
        status:'success',
        user
    })
}

exports.displayCart = async (req,res)=>{

    const user = await User.findById(res.locals.userId)
    if(user){
        let data = user.cart.map(async (item)=>{

            const { productId,category,quantity } = item

            const { _id, title, img, discountprice } = await getItem(category,productId);

            const price = Math.round(discountprice * quantity * 100)/100
            
            const displayItem = { _id,category,title,img,price,quantity }

            return displayItem
        })

        data = await Promise.all(data)

        res.status('200').json({
            status:'success',
            data:data
        })
    }
}

exports.updateQuantity = async(req,res)=>{
    const {productId,quantity} = req.body
    try{
        if(quantity > 0 && quantity < 10){
            const data = await User.updateOne({_id:res.locals.userId,'cart.productId':productId},{$set:{'cart.$.quantity':quantity}})

            res.status('200').json({
                status:'success',
            })          
        }else{
            console.log('Invalid Quantity')
        }
    }catch{
        res.status('500').json({
            status:'fail'
        })
    }
}

exports.deleteCartItem=async (req,res)=>{
    let {productId} = req.body

    try{
        await User.findOneAndUpdate({ _id:res.locals.userId },{ $pull: { cart: { productId:productId } } }, { safe:true,multi:true })
        res.status('200').json({
            status:'success'
        })
    }catch(err){
        console.log(err)

        res.status('500').json({
            status:'Fail'
        })
    }
}