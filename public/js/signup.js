const form = document.getElementById('signup-form')

const handleSignUp = (e)=>{
    e.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('passwordConfirm').value

    const error_area = document.querySelector('.error__response')
    
    axios({
        method:'post',
        url:'/users/signup',
        data:{
            name:name,
            email:email,
            password:password,
            passwordConfirm:passwordConfirm
        }
    })
    .then(()=>window.location.assign('/users/login'))
    .catch(err=>error_area.innerHTML="Couldnt Sign Up")
}

form.addEventListener('submit',handleSignUp)
