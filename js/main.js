function AgregarTarea() {
  //Guardar los elementos html importantes en variables
  const input = document.getElementById("nuevoElemento");
  const contenedor = document.getElementById("contenedor");
  //Añadir tarea
  //1. Crear un nuevo elemento tipo <li>
  let nuevoElemento = document.createElement("li");
  //2. Escribir dentro del elemento tipo <li> el valor del input
  nuevoElemento.innerHTML = input.value;
  //3. Colocar el nuevo elemento dentro del contenedor
  contenedor.appendChild(nuevoElemento);
  //4. Resetear el input
  input.value = "";
}
