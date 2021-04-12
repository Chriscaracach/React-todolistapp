import React, { useState } from "react";
import { CheckCircle, XCircle } from "react-bootstrap-icons"; //Íconos de Bootstrap
import "./styles.css"; //Hoja de estilos

//Importamos Firebase
import firebase from "firebase";
import { auth, firestore } from "../firebase.js";
import { useCollectionData } from "react-firebase-hooks/firestore";

//Función para desloguear
const desloguearConGoogle = () => {
  auth.signOut();
};

//Componente Todoapp
const Todoapp = ({ user }) => {
  const [tareas, setTareas] = useState(""); //Uso del Hook useState, para manipular el estado
  const Ref = firestore.collection(`usuarios/${auth.currentUser.uid}/tareas`); //Creación de la referencia de la base de datos (Firestore/Firebase)
  const [Tareas] = useCollectionData(Ref, { idField: "id" });

  //Función para agregar la nueva tarea a la base de datos
  const nuevaTarea = (e) => {
    if (tareas === " ") {
      alert("Entrada no válida");
    } else {
      e.preventDefault();
      Ref.add({
        texto: tareas,
        completa: false,
        horaCreacion: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setTareas("");
    }
  };

  return (
    <div className="container text-center" id="todoapp__contenedor">
      <header id="todoapp__header">
        <div className="container">
          <div className="row">
            <div className="col-5">
              <p className="todoapp__textosaludo" id="todoapp__textoheader">
                Lista de tareas
              </p>
            </div>
            <div className="col-2">
              <img
                src={user.photoURL} /*Consumo de datos de Firebase Auth*/
                alt=""
                id="todoapp__fotosaludo"
                className="m-2"
              />
            </div>
            <div className="col-3">
              <p className="todoapp__textosaludo">{user.displayName}</p>{" "}
              {/*Consumo de datos de Firebase Auth*/}
            </div>
            <div className="col-2">
              <button
                className="btn"
                onClick={desloguearConGoogle}
                id="todoapp__botondesloguear"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>
      <section id="todoapp__sectionform">
        <form onSubmit={nuevaTarea}>
          <div className="container" id="todoapp__contenedorform">
            <input
              type="text"
              required
              value={tareas}
              onChange={(e) => setTareas(e.target.value)}
              placeholder="Agregá una nueva tarea"
              id="todoapp__inputform"
            />
            <input
              type="submit"
              value="Agregar tarea"
              id="todoapp__inputsubmit"
            />
          </div>
        </form>
      </section>
      <section id="todoapp__sectionlist">
        {Tareas && Tareas.map((item) => <Itemtodo key={item.id} {...item} />)}{" "}
        {/*Mapeo sobre consumo de datos de la Base de datos para crear los items de la lista*/}
      </section>
    </div>
  );
};

//Componente Itemtodo
const Itemtodo = ({ id, completa, texto }) => {
  const Ref = firestore.collection(`usuarios/${auth.currentUser.uid}/tareas`); //Referencia de la base de datos (Firestore/Firebase)

  //Función para tildar cada item como completo
  const setCompleta = (id, completa) => {
    Ref.doc(id).set({ completa: !completa }, { merge: true });
  };
  //Función para eliminar item de la base de datos
  const borrarTarea = (id) => {
    Ref.doc(id).delete();
  };

  return (
    <div className="container" key={id}>
      <div className="row my-2" id="itemtodo__fila">
        <div className="col-8">
          <h5
            className={
              completa
                ? "itemtodo__texto completa"
                : "itemtodo__texto incompleta"
            } /*Operador ternario para modificar clases según si la tarea está "completa" o no*/
          >
            {texto}
          </h5>
        </div>
        <div className="col-2">
          <button
            className="btn itemtodo__boton"
            onClick={() => setCompleta(id, completa)}
          >
            <CheckCircle></CheckCircle>
          </button>
        </div>
        <div className="col-2">
          <button
            className="btn itemtodo__boton"
            onClick={() => borrarTarea(id)}
          >
            <XCircle></XCircle>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todoapp;
