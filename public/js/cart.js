const quantityButtons = document.querySelectorAll('.cart__item--quantity')
const deleteButtons = document.querySelectorAll('.cart__item--delete')

const updateQuantity = (e)=>{
    const productId = e.target.dataset.productid
    const quantity = e.target.value

    axios({
        method:'patch',
        url:'/cart',
        data:{
            productId,
            quantity
        }
    }).then(setTimeout(() => {
        location.reload()
    }, 100))
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
})

deleteButtons.forEach(btn=>{
    btn.addEventListener('click',deleteItem)
})