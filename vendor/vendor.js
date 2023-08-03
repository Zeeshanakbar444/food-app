import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { db } from "../firebaseConfig.js";


window.addEventListener("load", () => {
    let localUserLogin = JSON.parse(localStorage.getItem("uidUser"))
    if (localUserLogin === null) {
        window.location.replace("/")
        return
    } else {
        if (localUserLogin.type !== 'Vendor') {
            history.back()
            return

        }
    }
})


let ProductForm = document.getElementById("ProductForm");
let submitBtn = document.getElementById("submitBtn")


let ProductFormFunction = async (e) => {
    try {
        event.preventDefault();
        let productName = document.getElementById("productName").value
        let productDesc = document.getElementById("productDesc").value
        let productPrice = document.getElementById("productPrice").value

        submitBtn.className = ' btn btn-info'
        submitBtn.innerHTML = `<div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`


        let user = JSON.parse(localStorage.getItem("uidUser"))
        console.log(user.uid)
        let productObj = {
            productName,
            productDesc,
            productPrice,
            userUid: user.uid
        }




        const docRef = await addDoc(collection(db, "product"), productObj);
        console.log("succsefully added")

        submitBtn.className = ' btn btn-primary'
        submitBtn.innerHTML = "Add Product"

    } catch (error) {
        console.log(error.message)
        alert(error.message)
        loginBtn.className = ' btn btn-danger'
        loginBtn.innerHTML = "login"
    }
}
ProductForm.addEventListener("submit", ProductFormFunction)

let logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener('click' , ()=>{
    localStorage.removeItem('uidUser')
    window.location.replace("../index.html")
})