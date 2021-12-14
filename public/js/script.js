const Signinbutton = document.getElementById("signin button")
const Signupbutton = document.getElementById("signup button")
const Registerbutton = document.getElementById("register button") 
const Signinbox = document.getElementById("signin")
const Body = document.getElementById("body2")
const Signupbox = document.getElementById("signup")

Signinbutton.addEventListener("click",InitiateSignIn)
Registerbutton.addEventListener("click",function(){
Closemodal();
InitiateSignup();
});

function InitiateSignIn(){
    Signinbox.style.display = "flex";
    Body.style.opacity = "50%"; 
}
function Closemodal(){
Signinbox.style.display ="none";
Body.style.opacity = "100%";
}

function InitiateSignup(){
    Signupbox.style.display = "flex";
    Body.style.opacity = "0%";
}