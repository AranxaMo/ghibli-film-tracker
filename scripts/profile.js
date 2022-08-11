import { logoutAccount } from "./firebase.js";

const btnLogout = document.querySelector(".logout-icon");

btnLogout.addEventListener("click", () =>{
    logoutAccount();
})