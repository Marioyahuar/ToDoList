function AgregarTarea() {
  const input = document.getElementById("nuevoElemento");
  const contenedor = document.getElementById("contenedor");
  let nuevoElemento = document.createElement("li");
  nuevoElemento.innerHTML = input.value;

  let boton = document.createElement("button");
  boton.innerHTML = "BORRAR";
  boton.addEventListener("click", function (evento) {
    borrarElemento(evento);
  }); //Agarro el elemento botón y le agrego un "listener" para que detecte un evento tipo click. Cuando detecte el evento, ejecutará la función BorrarElemento
  nuevoElemento.appendChild(boton);

  let boton2 = document.createElement("button");
  boton2.innerHTML = "LISTO";
  boton2.addEventListener("click", checkElemento);
  nuevoElemento.appendChild(boton2);
  contenedor.appendChild(nuevoElemento);
  input.value = "";
}

function borrarElemento(event) {
  console.log("Con este botón se debería borrar el elemento");
  //1
  const botonApretado = event.currentTarget; //Obtengo el botón que acabo de apretar
  //2
  let elementoABorrar = botonApretado.parentNode; //Obtengo el elemento que quiero borrar a partir del botón
  //3
  elementoABorrar.parentNode.removeChild(elementoABorrar);
}

function checkElemento(event) {
  console.log("Con este botón se marca la tarea como lista");
  //1. Obtener el botón que se acaba de apretar
  const boton = event.currentTarget;
  //2. Obtener el elemento al que pertenece ese botón
  const elemento = boton.parentNode;
  //3. Agregarle un nuevo estilo al elemento
  elemento.classList.add("check");
}
