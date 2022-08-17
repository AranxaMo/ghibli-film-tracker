import { logoutAccount } from "./firebase.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
const auth = getAuth();

const nameTitle = document.querySelector(".username");
const btnLogout = document.querySelector(".logout-icon");

btnLogout.addEventListener("click", () =>{
    logoutAccount();
})


onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const username = user.displayName;
      nameTitle.textContent = username;
    } else {
      console.log("User not logged");
    }
});
