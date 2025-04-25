// inportar las preguntas y respuestas
import { preguntasYRespuestas } from "./preguntas-y-respuestas.js";

//variables
let preguntasSeleccionadas = [];
let puntaje = 0;

//Seleccionar los elementos del DOM
const contenedorPregunta = document.querySelector("#contenedor-pregunta");
const contenedorOpciones = document.querySelector("#contenedor-opciones");
const contenedorResultado = document.querySelector("#contenedor-resultado");

//punto de entrada del programa
mostrarTemas()

function mostrarTemas(){
  contenedorResultado.innerHTML = '';
  contenedorPregunta.innerHTML = '<h2 class="pregunta">Selecciona el tema:</h2>'

  Object.keys(preguntasYRespuestas).forEach((opcion)=>{
  contenedorOpciones.innerHTML += `<P class="opcion">${opcion.toUpperCase()}</P>`
  })

  const opciones = contenedorOpciones.querySelectorAll(".opcion");
  opciones.forEach((opcion)=>{
  opcion.addEventListener("click", ()=>{
    const tema = opcion.innerHTML.toLowerCase()
    seleccionarTema(tema);
  })
  })
}

//funcion para seleccionar un tema y mostrar la primer pregunta
function seleccionarTema(tema){
  preguntasSeleccionadas = preguntasYRespuestas[tema];
  mostrarPregunta(0)
}

function mostrarPregunta(indice){
  if(indice >= preguntasSeleccionadas.length){
    mostrarResultado()
    return;
  }
  const {pregunta, respuestaCorrecta, respuestas} = preguntasSeleccionadas[indice];
  contenedorPregunta.innerHTML = `<h2 class="pregunta">${pregunta}</h2>`;
  mostrarOpciones(respuestas, respuestaCorrecta, indice);
}

function mostrarOpciones(respuestas, respuestaCorrecta, indice){
  contenedorOpciones.innerHTML = '';
  respuestas.forEach((respuesta)=>{
    contenedorOpciones.innerHTML += `<P class="opcion">${respuesta}</P>`;
  })

  const opciones = contenedorOpciones.querySelectorAll('.opcion');
  opciones.forEach((opcion)=>{
    opcion.addEventListener('click', ()=>{
      //compara adonde el usuario hizo click con la respuesta correcta
      if(opcion.innerHTML === respuestaCorrecta){
        puntaje ++;
        opcion.classList.add("correcta")
      }else{
        opcion.classList.add("incorrecta")
      }
      setTimeout(() => {
        mostrarPregunta(indice +1);
      }, 500)
      
    })
  })
}

function mostrarResultado(){
  contenedorPregunta.innerHTML = '';
  contenedorOpciones.innerHTML = '';
  contenedorResultado.innerHTML = `
  <h2 class="total">Haz acertado ${puntaje} de ${preguntasSeleccionadas.length} preguntas:</h2>
  <div class = "contenedor-boton">
  <botton id = "reiniciarBtn">Reiniciar</botton>
  </div>
  `
  const butonReiniciar = contenedorResultado.querySelector("#reiniciarBtn");
  butonReiniciar.addEventListener("click", ()=>{
    puntaje = 0;
    mostrarTemas();
  })
}