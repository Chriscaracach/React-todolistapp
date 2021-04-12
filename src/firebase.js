//Importamos Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//Inicializamos la app con los tokens provistos desde Firebase
firebase.initializeApp({
  apiKey: "AIzaSyARDf7LkrXGiBTxYW9qvoA4BQzQIUJIgCE",
  authDomain: "todo-chriscaracach.firebaseapp.com",
  databaseURL: "https://todo-chriscaracach-default-rtdb.firebaseio.com",
  projectId: "todo-chriscaracach",
  storageBucket: "todo-chriscaracach.appspot.com",
  messagingSenderId: "518436274309",
  appId: "1:518436274309:web:abbf9ec5ae23dc26b169ec",
});

//Exportamos métodos para hacer más fácil el trabajo en los componentes
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Exportamos por defecto firebase
export default firebase;
