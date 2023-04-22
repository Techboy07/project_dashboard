import { Email } from "@mui/icons-material";
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";


export const firebase = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyAx-tFH5o6MbvzamrNXKyKwp-yC5j9WUUc",
        authDomain: "note-taking-app-5a43a.firebaseapp.com",
        projectId: "note-taking-app-5a43a",
        storageBucket: "note-taking-app-5a43a.appspot.com",
        messagingSenderId: "971849941633",
        appId: "1:971849941633:web:cfa4d9dd19a75cd8af8380"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    const signIn = (eml: string, pass: string) => {

        let user = signInWithEmailAndPassword(auth, eml, pass).then((userCred) => {
            return userCred
        }).catch((err) => {
            alert('an error occured')
            throw Error('an error occured')
        });

        return user
    }

    function createUser(eml: string, pass: string) {
        let user = createUserWithEmailAndPassword(auth, eml, pass).then((userCred) => {
            return userCred
        }).then((user) => {
            const db = getFirestore()
            const userEmail = user.user.email
            const docRef = collection(db, `users/${userEmail}/userPreference`)
            addDoc(docRef, {
                mode: true,
                accent: 'primary',
                nickname: userEmail?.slice(0, 7).toLocaleUpperCase()
            })
        })
            .catch((err) => {
                throw Error('an error occured')
            });

        return user
    }

    function resetPassword(eml: string) {
        const sendMessage = sendPasswordResetEmail(auth, eml)
        return sendMessage
    }

    function performOnAuth(func1: Function, func2: Function) {


        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                func1()
            } else {
                // User is signed out
                func2()

            }
        })
    }

    function logOut(func = () => console.log('user logged out')) {
        const user = signOut(auth).then(() => func())
        return user
    }


    return {
        app: app,
        auth: auth,
        signIn: signIn,
        createUser: createUser,
        performOnAuth: performOnAuth,
        logOut: logOut,
        currentUser: auth.currentUser,
        passwordReset: resetPassword

    }

}



