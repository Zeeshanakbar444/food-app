
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyDIAlBM1E0MD-b83-ufwGu2XSPZMphN2nE",
    authDomain: "todo-project-ca959.firebaseapp.com",
    projectId: "todo-project-ca959",
    storageBucket: "todo-project-ca959.appspot.com",
    messagingSenderId: "235000015044",
    appId: "1:235000015044:web:e510ee9b4f59db80aa0191",
    measurementId: "G-RF5TL1L4SS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



let signupBtn = document.getElementById("signupBtn");
signupBtn.addEventListener("click", signup)

async function signup(e) {
    e.preventDefault();
    try {

        let fullName = document.getElementById("fullName").value
        let phoneNumber = document.getElementById("phoneNumber").value
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        let dropItem = document.getElementById("dropItem").value

        signupBtn.className = "btn btn-info"
        signupBtn.innerHTML = `<div class="spinner-border text-primary" role="status">
<span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-border text-secondary" role="status">
<span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-border text-success" role="status">
<span class="visually-hidden">Loading...</span>
</div>`
        if (!fullName || !phoneNumber || !password) {
            console.log("fill your required field..");
            alert("please filled required field!")
            return
        }

        if (dropItem === "Select User Type") {
            console.log("pleae select a value");
            alert("please select a value!")
            signupBtn.innerHTML = "signup"
            return
        }

        const userAuth = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userAuth.user.uid)

        let uid = userAuth.user.uid

        let userObj = {
            fullName,
            phoneNumber,
            accountActivate: true,
            uid,
            type: dropItem
        }





        alert("user signup successfully")


        const userRef = doc(db, 'users', uid);
        const userInDataBase = await setDoc(userRef, userObj)
        window.location.href = "/"

    }
    catch (error) {
        console.log("error", error.message)
        alert(error.message)
        signupBtn.innerHTML = "signup"
        signupBtn.className = "btn btn-info"
    }

}