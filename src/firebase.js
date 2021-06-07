//Importamos Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//Inicializamos la app con los tokens provistos desde Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBGdL4znUJnxyl-wU286tttHvRWdA1caWw",
  authDomain: "todolistccaracach.firebaseapp.com",
  projectId: "todolistccaracach",
  storageBucket: "todolistccaracach.appspot.com",
  messagingSenderId: "354196307230",
  appId: "1:354196307230:web:07d9034ba3a1801367dd0f",
});

//Exportamos métodos para hacer más fácil el trabajo en los componentes
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Exportamos por defecto firebase
export default firebase;
