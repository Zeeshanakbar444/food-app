
import { getDoc, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { db } from "../firebaseConfig.js";


const getLocal = JSON.parse(localStorage.getItem('uidUser'))

let getData = () => {
    const product = onSnapshot(collection(db, "product"), (snapshot) => {
        snapshot.forEach(function (data) {
            let productParent = document.getElementById("productParent")

            if (data.data().userUid === getLocal.uid) {
                let dataGetDb = data.data()

                console.log("data", dataGetDb)
                let productData = `   <div class="card" style="width: 18rem;">
                <img src="${dataGetDb.imageUrl}" class="card-img-top card" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${dataGetDb.productName}</h5>
                  <p class="card-text">${dataGetDb.productDesc}</p>
                  <h1 class="card-text">$ ${dataGetDb.productPrice}</h1>
                </div>
        
              </div>`
                productParent.innerHTML += productData
            }



        })
    });
}









window.addEventListener("load", getData)

