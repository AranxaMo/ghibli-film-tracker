import { loginGoogle, loginEmail, loginTwitter } from "./firebase.js";
const btnGoogle = document.querySelector("#google-login");
const btnLogin = document.querySelector("#btnlogin");
const btnTwitter = document.querySelector("#twitter-login");

/*login with google*/
btnGoogle.addEventListener("click", (e) =>{
    e.preventDefault();
    loginGoogle();
})
/*login email*/
btnLogin.addEventListener("click", (e) =>{
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    console.log(email);
    loginEmail(email, password);
})

/*login twitter*/
btnTwitter.addEventListener("click", (e)=>{
    e.preventDefault();
    loginTwitter();
})
