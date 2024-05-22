import {initializeApp} from "firebase/app";
import {firebaseConfig} from "./firebase.config";
import {getAuth, GoogleAuthProvider, EmailAuthProvider} from "firebase/auth";
import {Paths} from "./Routes";
import { getFirestore } from "firebase/firestore";

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();
export const Providers = {google: new GoogleAuthProvider()};

export const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: Paths.Home,
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
    ]
};