import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlN_xy_1FE35svI5v28650yG6uxIyo29s",
    authDomain: "opportunity-c9064.firebaseapp.com",
    projectId: "opportunity-c9064",
    storageBucket: "opportunity-c9064.appspot.com",
    messagingSenderId: "115766886133",
    appId: "1:115766886133:web:d49bbfe0f13cc339188fbc",
    measurementId: "G-C804VH28WZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
