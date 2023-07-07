import { post, deleteTask, getTask, updateTask } from "./APi.js";

var lanzarT = window.document.querySelector("#boton1");
var lista = window.document.querySelector("#listaDeso");
let btn = document.getElementById("boton1");
var suma = document.getElementById("contarclick");

var textoTare = document.getElementById("noExist");
var contador = 0;
document.addEventListener("DOMContentLoaded", cargarTareas);

var task = {
  task: "",
  checked: false,
};

async function cargarTareas() {
  let tareas = await getTask();
  let contadorAux = 0;

  tareas.forEach((tarea) => {
    crearVariables(tarea);
  });

  for (let index = 0; index < tareas.length; index++) {
    if (tareas[index].checked == true) {
      contadorAux++;
    }
  }
  suma.innerText = contadorAux;
  contador = contadorAux;
}

function crearVariables(tarea) {
  var listap = document.createElement("li");
  listap.id = tarea.id;

  let pTexto = document.createElement("p");
  pTexto.id = "texto-lista";
  pTexto.textContent = tarea.task;

  let eliminar = document.createElement("button");
  eliminar.id = "button";
  eliminar.textContent = "🗑️";

  listap.appendChild(pTexto);
  listap.appendChild(validaC(tarea));
  listap.appendChild(eliminar);
  lista.appendChild(listap);
  textoTare.style.display = "none";

  eliminar.addEventListener("click", async function () {
    if (listap) {
      let lista12 = listap.id;
      console.log(lista12);
      await deleteTask(lista12);
      listap.remove();

      let checkbox = listap.querySelector("input");

      if (checkbox.checked) {
        contador--;
        suma.innerHTML = contador;
      }
    }

    const tamano = document.querySelectorAll("li");

    if (tamano.length == 0) {
      textoTare.style.display = "block";
    }

    //salida falsa eliminar
  });
}

function validaC(tarea) {
  let checkbox = document.createElement("input");
  checkbox.id = "input";
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = tarea.checked;

  checkbox.addEventListener("click", async function () {
    if (checkbox.checked) {
      let suma = document.getElementById("contarclick");
      contador++;

      suma.innerHTML = contador;
    } else {
      let suma = document.getElementById("contarclick");
      contador--;
      suma.innerHTML = contador;
      //validacion check
    }
    tarea.checked = checkbox.checked;
    await updateTask(tarea);
  });
  return checkbox;
}

async function LanzarTarea() {
  var texto = document.querySelector("#agg");
  var texto1 = texto.value;

  if (texto1.trim() !== "") {
    task.task = texto1;

    let resultadoPost = await post(task);

    crearVariables(resultadoPost);

    agg.value = "";
  } else {
    return alert("Inserte tarea");
  }
}

document.getElementById("agg");
addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();

    LanzarTarea();
  }
});

///envio las funciones que no me generan problemas

export { LanzarTarea, btn, validaC };
