const toggleButton = document.querySelector(".ham-menu");
const navbar = document.querySelector(".nav-bar");
const navlink = document.querySelectorAll(".navlink");

toggleButton.addEventListener('click',()=>{
    navbar.classList.toggle("ham-active");
    navlink.forEach(navlink=>{
        navlink.classList.toggle("display")
    })
})