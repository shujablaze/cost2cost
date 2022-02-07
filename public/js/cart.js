const quantityButtons = document.querySelectorAll('.cart__item--quantity')
const deleteButtons = document.querySelectorAll('.cart__item--delete')

const updateQuantity = async (e)=>{
    const productId = e.target.dataset.productid
    const quantity = e.target.value

    if(!quantity) return

    try{
        const res = await axios({
            method:'patch',
            url:'/cart',
            data:{
                productId,
                quantity
            }
        })
        if(res.data.status === 'ok'){
            setTimeout(() => {
                location.reload()
            }, 100)
        }
    }catch(err){
        alert(err.response.data.message)
        e.target.value = 1
    }
}

const deleteItem = (e)=>{
    const productId = e.target.dataset.productid

    axios({
        method:'delete',
        url:'/cart',
        data:{
            productId
        }
    }).then(setTimeout(() => {
        location.reload()
    }, 100))
}


quantityButtons.forEach(btn=>{
    btn.addEventListener('change',updateQuantity)
    btn.addEventListener('input',updateQuantity)
})

deleteButtons.forEach(btn=>{
    btn.addEventListener('click',deleteItem)
})