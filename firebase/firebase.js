import { initializeApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp

export const auth = getAuth();

export const Authentication = () => {
  return auth
}

export const SignUp = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};
export const SignIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};
export const SignOut = async () => {
  await signOut(auth);  
};

export const GetSignInErrorMessages = (code) => {
  switch (code) {
    case 'auth/wrong-password':
      return 'Email atau password anda salah'
    case 'auth/user-not-found':
    default:
      return 'Akun tidak terdaftar'
  }
}

export const GetSignUpErrorMessages = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Email sudah terdaftar'
    default:
      return 'Terjadi kesalahan'
  }
}

export const storage = getStorage(firebaseApp)