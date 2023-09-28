
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDn5fIyE3Mlm_8ZjzoJJixYqRQlS3Vdhyc",
    authDomain: "with-email-and-password.firebaseapp.com",
    projectId: "with-email-and-password",
    storageBucket: "with-email-and-password.appspot.com",
    messagingSenderId: "594382280997",
    appId: "1:594382280997:web:e21a264977cf90be9862cc"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;