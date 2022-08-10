// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged, signInWithEmailAndPassword, TwitterAuthProvider, getRedirectResult } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjGZEnmf9xKAv0vK73NVwkz5CcULw9f1A",
  authDomain: "ghibli-tracker-a195b.firebaseapp.com",
  projectId: "ghibli-tracker-a195b",
  storageBucket: "ghibli-tracker-a195b.appspot.com",
  messagingSenderId: "653331894933",
  appId: "1:653331894933:web:f62cdf075bb5fffded019c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

/*Modal*/
const signupModal = document.querySelector(".create-account");
const signupContainer = document.querySelector(".signup-container");
const signupBackground = document.querySelector(".signup-background");
const close = document.querySelector(".close");

signupModal?.addEventListener("click", function(){
  signupContainer.classList.add("shown");
  signupContainer.classList.remove("hidden");
  signupBackground.classList.remove("hidden");
});
close?.addEventListener("click", function(){
  signupContainer.classList.add("hidden");
  signupContainer.classList.remove("shown");
  signupBackground.classList.add("hidden");
});

/*Chech if User Loged*/
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario logueado", user.displayName);
    //window.open("./html/home.html", "_self");
    const uid = user.uid;
    // ...
  } else {
    console.log("No hay ningún usuario logueado");
  }
});

/*Logout*/

// function logoutAccount() {
//   signOut(auth).then(() => {
//     alert("Sign out succesfully");
//   }).catch((error) => {
//     console.error(error);
//   });
// }


/*Sign Up*/
const btnSignup = document.querySelector("#signup");

btnSignup?.addEventListener("click", (e) =>{
  e.preventDefault();
  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#password-user").value;
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("Usuario creado");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage);
    // ..
  });
});

/*Login with Google*/
const loginGoogle = document.querySelector("#google-login");

loginGoogle?.addEventListener("click", (e) => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
});

/*Login Email*/
const btnLogin = document.querySelector("#btnlogin");
btnLogin?.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("Login Exitoso");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage);
  });
});

/*Login Twitter*/ 
const loginTwitter = document.querySelector("#twitter-login");
loginTwitter?.addEventListener("click", (e) =>{
  const provider = new TwitterAuthProvider();
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
  .then((result) => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const secret = credential.secret;
    // ...

    // The signed-in user info.
    const user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = TwitterAuthProvider.credentialFromError(error);
    console.log(email);
    // ...
  });
});

