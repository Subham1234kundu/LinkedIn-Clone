import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyBp0zmgo1QP9NYy7d48trxCLJtJNTXAl0s",
    authDomain: "linkedin-clone-e1762.firebaseapp.com",
    projectId: "linkedin-clone-e1762",
    storageBucket: "linkedin-clone-e1762.appspot.com",
    messagingSenderId: "606235476166",
    appId: "1:606235476166:web:c84e7903cf8df81b3457c7",
    measurementId: "G-8PKPNDHSJN"
  };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const firestore = getFirestore(app);
 const storage = getStorage(app)
 export{app,auth,firestore,storage};
  