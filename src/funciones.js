import { post, deleteTask } from "./APi.js";

var lanzarT = window.document.querySelector("#boton1");
var lista = window.document.querySelector("#listaDeso");
let btn = document.getElementById("boton1");

var contador = 0;

function validaC() {
  let checkbox = document.createElement("input");
  checkbox.id = "input";
  checkbox.setAttribute("type", "checkbox");

  checkbox.addEventListener("click", function () {
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
  });
  return checkbox;
}

async function LanzarTarea() {
  var texto = document.querySelector("#agg");
  var texto1 = texto.value;

  if (texto1.trim() !== "") {
    var listap = document.createElement("li");

    let task = { task: texto1 };

    let resultadoPost = await post(task);

    listap.id = resultadoPost.id;

    let pTexto = document.createElement("p");
    pTexto.id = "texto-lista";

    pTexto.textContent = texto1;
    let eliminar = document.createElement("button");
    eliminar.id = "button";

    eliminar.textContent = "🗑️";
    listap.appendChild(pTexto);
    listap.appendChild(validaC());

    listap.appendChild(eliminar);

    lista.appendChild(listap);

    var textoTare = document.getElementById("noExist");
    textoTare.style.display = "none";
    agg.value = "";

    eliminar.addEventListener("click", function () {
      if (listap) {
        let lista12 = listap.id;
        console.log(lista12);
        deleteTask(lista12);
        listap.remove();

        let checkbox = listap.querySelector("input");
        let suma = document.getElementById("contarclick");

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
