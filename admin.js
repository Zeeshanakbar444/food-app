import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { db } from "./firebaseConfig.js";

let tableBody = document.getElementById("tableBody")
window.addEventListener("load", getAllUser)

async function getAllUser() {

    const querySnapshot = await getDocs(collection(db, "users"))
    querySnapshot.forEach(function (doc) {
        let user = doc.data()
        console.log(user.type)
        if (user.type !== "admin") {
            let data = `<tr>
   <td>${user.fullName}</td >
   <td>${user.phoneNumber}</td>
   <td>${user.type}</td>
   <td>${user.accountActivate   ? `<div class="form-check form-switch">
   <input class="form-check-input" onchange="handleAccountActivation(this ) id="${user.uid}" type="checkbox" id="flexSwitchCheckChecked" checked>
 </div>` : `<div class="form-check form-switch">
 <input class="form-check-input"  onchange="handleAccountActivation(this  )"  id="${user.uid}" type="checkbox" id="flexSwitchCheckChecked" >
</div>`

       }</td>   </td>


   </tr >  `
            tableBody.innerHTML += data

        }
    });
}
window.handleAccountActivation  = function handleAccountActivation(e  ){
    let abc = document.getElementById(`${user.uid}`);
    console.log(abc)
}