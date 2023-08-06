
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

import { auth, db } from "../firebaseConfig.js"

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
        console.log(userAuth)




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
        window.location.href = "../index.html"
        signupBtn.innerHTML = "signup"
        signupBtn.className = "btn btn-info"

    }
    catch (error) {
        console.log("error", error.message)
        alert(error.message)
        signupBtn.innerHTML = "signup"
        signupBtn.className = "btn btn-info"
    }

}