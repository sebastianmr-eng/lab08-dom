// VERSION 3:Final
console.log("app.js cargado (v3)");

//Clases
class Tarea {
  constructor(texto) {
    this.id = Tarea.contadorId++;
    this.texto = texto;
    this.completada = false;
  }

  alternar() {
    this.completada = !this.completada;
  }

  descripcion() {
    return (this.completada ? "[hecha] " : "[pendiente] ") + this.texto;
  }
}
Tarea.contadorId = 1;

class ListaTareas {
  constructor() {
    this.tareas = [];
  }

  existe(texto) {
    return this.tareas.some(function (t) {
      return t.texto.toLowerCase() === texto.toLowerCase();
    });
  }

  agregar(texto) {
    const tarea = new Tarea(texto);
    this.tareas.push(tarea);
    return tarea;
  }

  buscar(id) {
    return this.tareas.find(function (t) {
      return t.id === id;
    });
  }

  alternar(id) {
    const tarea = this.buscar(id);
    if (tarea) tarea.alternar();
  }

  eliminar(id) {
    this.tareas = this.tareas.filter(function (t) {
      return t.id !== id;
    });
  }

  limpiarCompletadas() {
    this.tareas = this.tareas.filter(function (t) {
      return !t.completada;
    });
  }

  contarCompletadas() {
    return this.tareas.filter(function (t) {
      return t.completada;
    }).length;
  }
}

//DOM
const form = document.getElementById("formTarea");
const input = document.getElementById("inputTarea");
const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");
const lista = document.getElementById("lista");
const resumen = document.getElementById("resumen");
const btnLimpiar = document.getElementById("btnLimpiar");

const listaTareas = new ListaTareas();

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = tipo;
}

function validar(texto) {
  if (texto.length < 3) return "Escribe al menos 3 caracteres.";
  if (listaTareas.existe(texto)) return "Esa tarea ya está en la lista.";
  return "";
}

function crearItem(tarea) {
  const li = document.createElement("li");
  li.dataset.id = tarea.id;
  if (tarea.completada) li.classList.add("hecha");

  const span = document.createElement("span");
  span.textContent = tarea.texto;

  const btnMarcar = document.createElement("button");
  btnMarcar.type = "button";
  btnMarcar.textContent = tarea.completada ? "Desmarcar" : "Marcar";
  btnMarcar.className = "marcar";

  const btnBorrar = document.createElement("button");
  btnBorrar.type = "button";
  btnBorrar.textContent = "Borrar";
  btnBorrar.className = "borrar";

  li.append(span, btnMarcar, btnBorrar);
  return li;
}

function render() {
  lista.replaceChildren();
  for (const tarea of listaTareas.tareas) {
    lista.appendChild(crearItem(tarea));
  }
  resumen.textContent =
    listaTareas.contarCompletadas() +
    " de " +
    listaTareas.tareas.length +
    " tareas completadas";
}

//Eventos
input.addEventListener("input", function () {
  contador.textContent = input.value.length + " / " + input.maxLength;
});

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const texto = input.value.trim();
  const error = validar(texto);

  if (error !== "") {
    mostrarMensaje(error, "error");
    input.focus();
    return;
  }

  const tarea = listaTareas.agregar(texto);
  console.log("Nueva tarea:", tarea.descripcion());
  mostrarMensaje("Tarea agregada.", "ok");
  form.reset();
  contador.textContent = "0 / " + input.maxLength;
  render();
});

lista.addEventListener("click", function (evento) {
  const li = evento.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (evento.target.classList.contains("borrar")) {
    listaTareas.eliminar(id);
  } else if (evento.target.classList.contains("marcar")) {
    listaTareas.alternar(id);
  } else {
    return;
  }
  render();
});

btnLimpiar.addEventListener("click", function () {
  listaTareas.limpiarCompletadas();
  render();
});

render();
