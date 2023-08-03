import { getDoc, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { db } from "../firebaseConfig.js";

window.addEventListener("load", () => {
    let localUserLogin = JSON.parse(localStorage.getItem("uidUser"))
    if (localUserLogin === null) {
        window.location.replace("/")
        return
    } else {
        if (localUserLogin.type !== 'Customer') {
            history.back()
            return

        }
    }
})

let getData = () => {
    const product = onSnapshot(collection(db, "product"), (snapshot) => {
        snapshot.forEach(function (data) {
            console.log("data", data.data())
        })
    });
}
window.addEventListener("load", getData)

let logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('uidUser')
    window.location.replace("../index.html")
})