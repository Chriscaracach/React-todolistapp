import React from "react";
import "./components/styles.css"; //Hoja de estilos

//Importamos componentes
import Todoapp from "./components/Todoapp.js";

//Importamos Firebase
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

//Función para loguearse con Google(Firebase)
const loguearConGoogle = () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

//Componente Login (se muestra si no hay nadie logueado)
const Login = () => {
  return (
    <div className="container text-center" id="login__contenedor">
      <button
        className="btn btn-primary"
        onClick={loguearConGoogle} //Función para loguearse
        id="login__botonloguear"
      >
        Loguear con Google
      </button>
    </div>
  );
};

//Componente App
const App = () => {
  const [user] = useAuthState(auth); //En esta constante guardamos el usuario logueado para consumir sus datos
  return (
    <div className="container" id="app__contenedor">
      {user ? <Todoapp user={user}></Todoapp> : <Login></Login>}{" "}
      {/*Usando el operador condicional ternario, elegimos si mostramos el componente Login(para loguearse), o el componente Todoapp*/}
    </div>
  );
};

export default App;
