// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBRQgtsbZquXa0gh0jyM4UuknA52zwVCvA",
    authDomain: "flomo-apk.firebaseapp.com",
    projectId: "flomo-apk",
    storageBucket: "flomo-apk.firebasestorage.app",
    messagingSenderId: "111451622473",
    appId: "1:111451622473:web:92aa0358b9cd0101108398",
    measurementId: "G-MM8T215RSW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/calendar.events");

provider.setCustomParameters({
    access_type: "offline",
    prompt: "consent",
});
export const auth = getAuth(app);
const analytics = getAnalytics(app);

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken; 

        localStorage.setItem('google_token', token)
        console.log("Logged in and token saved")
        const user = result.user;
        return { user, token };
    } catch (error) {
        console.error("Google sign-in error:", error);
        throw error;
    }
    };