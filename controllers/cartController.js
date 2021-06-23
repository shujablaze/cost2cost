const User = require('../models/User'); 

exports.updateCart = async(req,res)=>{
    const productId='60d2dcac11902a2d58ac4b8f'
    const productCategory='Chair'

    const cartItem = {product:productId,category:productCategory,quantity:1}

    const userId = '60d2dcac11902a2d58ac4b8f'

    const user = await User.findById(userId)

    if(user){
        user.cart.push(cartItem)
        await user.save({validateBeforeSave:false})
    }
}