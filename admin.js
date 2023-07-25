import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, doc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
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
const db = getFirestore(app);


window.addEventListener("load", getAllUser)

async function getAllUser() {

    const querySnapshot = await getDocs(collection(db, "users"))
    querySnapshot.forEach(function (doc) {
        console.log("data", doc.data());
    });
}