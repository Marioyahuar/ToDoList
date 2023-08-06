async function AgregarTarea() {
  const input = document.getElementById("nuevoElemento");

  const contenedor = document.getElementById("contenedor");
  let nuevoElemento = document.createElement("li");
  nuevoElemento.innerHTML = input.value;
  await Create(input.value, "marioyahuar", false);
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
  //4
  TestDelete(elementoABorrar.id);
}

async function checkElemento(event) {
  console.log("Con este botón se marca la tarea como lista");
  //1. Obtener el botón que se acaba de apretar
  const boton = event.currentTarget;
  //2. Obtener el elemento al que pertenece ese botón
  const elemento = boton.parentNode;
  //3. Agregarle un nuevo estilo al elemento
  elemento.classList.add("check");
  //4. Marcar en la base de datos que la tarea está lista
  console.log(elemento.id);
  TestCheck(elemento.id);
}

async function TestRead() {
  const userName = "marioyahuar";

  fetch(`php/getTask.php?userName=${userName}`, {
    method: "GET",
  })
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      }
    })
    .then(function (_getData) {
      const tareas = JSON.parse(_getData);
      MostrarTareas(tareas);
    });
}

async function CheckTarea(id) {
  var formulario = new FormData();
  formulario.append("id", id);

  fetch("php/checkTarea.php", {
    method: "POST",
    body: formulario,
  })
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      }
    })
    .then(function (_getData) {
      console.log("TAREA MODIFICADA: ", _getData);
    })
    .catch((error) => console.log("TODO ESTO FUE UN ERROR ", error));
}

async function DeleteTarea(id) {
  var formulario = new FormData();
  formulario.append("id", id);

  fetch("php/deleteTask.php", {
    method: "POST",
    body: formulario,
  })
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      }
    })
    .then(function (_getData) {
      console.log("TAREA ELIMINADA: ", _getData);
    })
    .catch((error) => console.log("TODO ESTO FUE UN ERROR ", error));
}

//tareas = [ {tarea1}, {tarea2}, {tarea3}]
function MostrarTareas(tareas) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";
  tareas.forEach((tarea) => {
    if (tarea.Active == 1) {
      let nuevoElemento = document.createElement("li");
      nuevoElemento.setAttribute("id", tarea.ID);
      nuevoElemento.innerHTML = tarea.Detalle; //input.value
      let boton = document.createElement("button");
      boton.innerHTML = "BORRAR";
      boton.addEventListener("click", function (evento) {
        borrarElemento(evento);
      });
      nuevoElemento.appendChild(boton);
      let boton2 = document.createElement("button");
      boton2.innerHTML = "LISTO";
      boton2.addEventListener("click", checkElemento);
      nuevoElemento.appendChild(boton2);
      if (tarea.Listo == "1") {
        nuevoElemento.classList.add("check");
      }
      contenedor.appendChild(nuevoElemento);
    }
  });
}

async function TestCreate() {
  await Create("Tarea de prueba N° 1", "Marioyahuar", false);
}

async function TestCheck(id) {
  await CheckTarea(id);
}

async function TestDelete(id) {
  await DeleteTarea(id);
}

async function Create(detalle, usuario, listo) {
  var formulario = new FormData();
  formulario.append("detalle", detalle);
  formulario.append("usuario", usuario);
  formulario.append("listo", listo);

  fetch("php/createTask.php", {
    method: "POST",
    body: formulario,
  })
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      }
    })
    .then(function (_getData) {
      console.log("TAREA CREADA: ", _getData);
    })
    .catch((error) => console.log("TODO ESTO FUE UN ERROR ", error));
}

TestRead();

/*
async function Test() {
  await getTestTask();
}

async function TestCreate() {
  await crearTask("tarea de prueba 3", "marioyahuar", 0);
}

async function getTestTask() {
  fetch("php/getTask.php", {
    method: "GET",
  })
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      }
    })
    .then(function (_getData) {
      console.log(_getData);
    });
}

async function crearTask(detalle, usuario, listo) {
  Realiza una solicitud HTTP al endpoint de creación de tareas
  var formulario = new FormData();
  formulario.append("detalle", detalle);
  formulario.append("usuario", usuario);
  formulario.append("listo", listo);
  console.log(formulario);
  await fetch("php/createTask.php", {
    method: "POST",
    body: formulario,
  })
    .then((response) => response.json())
    .then((data) => {
      Aquí puedes manejar la respuesta del servidor después de crear el pedido
      if (data.error) {
        throw new Error(data.error);
      }
      console.log("Tarea creada:", data);
    })
    .catch((error) => {
      Aquí puedes manejar cualquier error que ocurra durante la creación del pedido
      console.error("Error al crear la tarea", error);
    });
}
*/
