const form = document.getElementById('login-form')

const handleLogin = (e)=>{
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    const error_area = document.querySelector('.error__response')
    axios({
        method:'post',
        url:'/users/login',
        data:{
            email,
            password
        }
    })
    .then(res=>window.location.assign('/'))
    .catch(
        err=>error_area.innerHTML=err.response.data.data.message)
}

form.addEventListener('submit',handleLogin)

