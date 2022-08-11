import { signup } from "./firebase.js";


const btnSignup = document.querySelector(".btn-register");
const emailRegister = document.querySelector("#email-register");
const passwordRegister = document.querySelector("#password");
const username = document.querySelector("#username");
const passwordConfirm = document.querySelector("#password-confirm");

/*sign up*/
btnSignup.addEventListener("click", (e) =>{
    const email = emailRegister.value;
    const password = passwordRegister.value;
    const name = username.value;
    signup(email,password,name);
});
