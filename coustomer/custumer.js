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


let productParent = document.getElementById('productParent')
let getData = () => {
    const product = onSnapshot(collection(db, "product"), (snapshot) => {
        snapshot.forEach(function (data) {
            console.log("data", data.data())
            let dataGetFb = data.data()

            let dataCard = `  <div class="card" style="width: 18rem;">
            <img src="${dataGetFb.imageUrl}" class="card-img-top card" alt="...">
            <div class="card-body">
              <h5 class="card-title">${dataGetFb.productName}</h5>
              <p class="card-text">${dataGetFb.productDesc}</p>
              <a class="btn btn-primary">$ ${dataGetFb.productPrice}</a>
            </div>
    
          </div>`

            productParent.innerHTML += dataCard



            // imageUrl  productDesc productName productPrice  userUid


        })
    });
}
window.addEventListener("load", getData)

let logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('uidUser')
    window.location.replace("../index.html")
})