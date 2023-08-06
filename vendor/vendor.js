import { collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { db } from "../firebaseConfig.js";
import { storage } from "../firebaseConfig.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


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
        let submitBtn = document.getElementById("submitBtn");
        let productFile = document.getElementById("file")
        console.log('productFile ', productFile.files[0])




        const imageUrl = await uploadImage(productFile.files[0])







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
            userUid: user.uid,
            imageUrl: imageUrl

        }
        console.log(productObj, "productObj")


        const docRef = await addDoc(collection(db, "product"), productObj);



        console.log("data", docRef)


        console.log("succsefully added")

        submitBtn.className = ' btn btn-primary'
        submitBtn.innerHTML = "Add Product"

    } catch (error) {

        console.log(error.message)
        alert(error.message)
        submitBtn.className = ' btn btn-danger'
        submitBtn.innerHTML = "login"
    }
}
ProductForm.addEventListener("submit", ProductFormFunction)

let logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('uidUser')
    window.location.replace("../index.html")
})




function uploadImage(file) {
    return new Promise(function (resolve, reject) {

        // Create the file metadata
        /** @type {any} */

        let imageUrl;
        const metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'productImages/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;

                }
            },

            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                console.log(error.message)
                reject({
                    message: "something went wrong"
                })
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        );


    })
}



