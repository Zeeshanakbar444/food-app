import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { auth, db } from "./firebaseConfig.js"


window.addEventListener("load", function () {
    let data = JSON.parse(localStorage.getItem("uidUser"))
    console.log(data)





    if (localStorage.getItem("uidUser")) {

        // history.back()
        if (data.type === "admin") {
            this.window.location.replace("./admin/admin.html")
        } else if (data.type === "Vendor") {
            this.window.location.replace("./vendor/vendor.html")
        } else if (data.type === "Customer") {
            this.window.location.replace("./coustomer/customer.html")
        }
        return
    } else {

    }
})


let loginBtn = document.getElementById("loginBtn")
loginBtn.addEventListener("click", login)








async function login(e) {
    e.preventDefault();
    try {
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value

        loginBtn.className = ' btn btn-info'
        loginBtn.innerHTML = `<div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`




        const userLogin = await signInWithEmailAndPassword(auth, email, password)
        let uid = userLogin.user.uid
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.log("no found document");
            alert("invalid user");
            return
        }
        let userData = docSnap.data()
        localStorage.setItem("uidUser", JSON.stringify(userData))

        if (userData.type === "admin") {
            window.location.replace("./admin/admin.html")
        } else if (userData.type === "Customer") {

            if (!userData.accountActivate) {
                loginBtn.className = "btn btn-danger"
                loginBtn.innerHTML = `Login`
                alert("Your account is disabled")
                return

            }

            window.location.replace("./coustomer/customer.html")
        } else if (userData.type === "Vendor") {

            if (!userData.accountActivate) {
                loginBtn.className = "btn btn-danger"
                loginBtn.innerHTML = `Login`
                alert("Your account is disabled")
                return

            }
            window.location.replace("./vendor/vendor.html")

        }
    }
    catch (error) {
        console.log("error", error.message)
        alert(error.message)
        loginBtn.className = ' btn btn-danger'
        loginBtn.innerHTML = "login"
    }
}



