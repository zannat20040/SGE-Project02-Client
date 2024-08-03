// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPqaEz_FinWmuQmalmSaxc5LFaQ-mSbCg",
  authDomain: "sge-project02.firebaseapp.com",
  projectId: "sge-project02",
  storageBucket: "sge-project02.appspot.com",
  messagingSenderId: "683004837584",
  appId: "1:683004837584:web:2bbce219083af8dbe728d5"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export default app