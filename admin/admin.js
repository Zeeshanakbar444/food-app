import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { db } from "../firebaseConfig.js";

let tableBody = document.getElementById("tableBody")
window.addEventListener("load", getAllUser)

async function getAllUser() {



    let localUserLogin = JSON.parse(localStorage.getItem("uidUser"))
    if (localUserLogin === null) {
        window.location.replace("/")
        return
    } else {
        if (localUserLogin.type !== 'admin') {
            history.back()
            return
        }
    }



    const querySnapshot = await getDocs(collection(db, "users"))
    querySnapshot.forEach(function (doc) {
        let user = doc.data()
        console.log(user.type)
        if (user.type !== "admin") {
            let data = `<tr>
   <td>${user.fullName}</td >
   <td>${user.phoneNumber}</td>
   <td>${user.type}</td>
   <td>${user.accountActivate ? `<div class="form-check form-switch">
   <input class="form-check-input" id=${user.uid}  onchange={handleAccountActivation(this)} type="checkbox"  checked>
 </div>` : `<div class="form-check form-switch">
 <input class="form-check-input" id=${user.uid}  onchange={handleAccountActivation(this)} type="checkbox" id="flexSwitchCheckChecked" >
</div>`   }</td>   </td>
   </tr >  `

            tableBody.innerHTML += data

        }
    });
}
async function handleAccountActivation(e) {

    try {
        const userRef = doc(db, "users", e.id);
        await updateDoc(userRef, {
            accountActivate: e.checked
        })

    } catch (error) {
        alert(error.message)
        console.log(error.message)
    }

}


let logoutBtn = document.getElementById('logoutBtn')
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("uidUser");
    location.replace("../index.html")
})
window.handleAccountActivation = handleAccountActivation