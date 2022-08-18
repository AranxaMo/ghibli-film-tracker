// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged, signInWithEmailAndPassword, TwitterAuthProvider, getRedirectResult, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, deleteDoc, updateDoc, onSnapshot, getDoc } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js"
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
const db = getFirestore(app);
let userId;
let username;

/*Chech if User Loged*/
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
    console.log(`User logged ${user.displayName}`);
    const uid = user.uid;
    username = user.displayName;
    // ...
    if (user && window.location == "https://ghibli-tracker-aranxamo.netlify.app/html/login.html") {
      // http://127.0.0.1:5500/html/login.html
      //window.open("../html/home.html", "_self");
      window.open("https://ghibli-tracker-aranxamo.netlify.app/html/home.html", "_self");
    }
  } else {
    console.log("User not logged");
  }
});

/*Logout*/
export function logoutAccount() {
  signOut(auth).then(() => {
    alert("Sign out successfully");
  }).catch((error) => {
    console.error(error);
  });
}


/*Sign Up*/
export function signup (emailRegister, passwordRegister, username) {
  createUserWithEmailAndPassword(auth, emailRegister, passwordRegister)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    user.displayName = username;
    alert("User successfully created! We've sent you a verification email");
    //
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
      });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage);
    // ..
  });
}



/*Login with Google*/
export function loginGoogle() {
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
}

/*Login Email*/
export function loginEmail(emailLogin, passwordLogin){
  signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(error);
  });
}


/*Login Twitter*/ 
export function loginTwitter() {
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
}

/*FIREBASE*/
export async function saveMovie(title, watch, rate) {
  await setDoc(doc(db, userId, title), {
    film: title,
    watched: watch,
    rating: rate
  });
}

export async function deleteMovie(title) {
  await deleteDoc(doc(db, userId, title));
}

export async function updateMovieRating(title, rate){
  await updateDoc(doc(db, userId, title), {
    rating: rate
  })
}

export async function updateMovieStatus(title, watch){
  await updateDoc(doc(db, userId, title), {
    watched: watch
  })
}

export{
  onSnapshot, doc, db, auth, onAuthStateChanged, collection
}