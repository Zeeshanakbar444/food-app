
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyDIAlBM1E0MD-b83-ufwGu2XSPZMphN2nE",
    authDomain: "todo-project-ca959.firebaseapp.com",
    projectId: "todo-project-ca959",
    storageBucket: "todo-project-ca959.appspot.com",
    messagingSenderId: "235000015044",
    appId: "1:235000015044:web:e510ee9b4f59db80aa0191",
    measurementId: "G-RF5TL1L4SS"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


let loginBtn = document.getElementById("loginBtn")
loginBtn.addEventListener("click", login)
async function login(e) {
    e.preventDefault();
    try {
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value

        const userLogin = await signInWithEmailAndPassword(auth, email, password)
        console.log(userLogin)
        localStorage.setItem("uidUser", userLogin.user.uid)
        window.location.replace("./dashbord.html")

    }
    catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }
}
window.addEventListener("load"  , function  () {
    if (localStorage.getItem("uidUser")) {
        window.location.href = "./dashbord.html"
    }
})
