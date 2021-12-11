const Signinbutton = document.getElementById("signin button")
const Signupbutton = document.getElementById("signup button")
const Registerbutton = document.getElementById("register button") 
const Signinbox = document.getElementById("signin")
const Body = document.getElementById("body")

Signinbutton.addEventListener("click",InitiateSignIn)






function InitiateSignIn(){
    Signinbox.style.display = "flex";
    Body.style.opacity = "50%";
    Signinbox.style.opacity = "100%";
    
}
function InitiateSignup(){
    
}