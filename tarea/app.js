// VERSION 2: DOM + eventos (submit, input y click)
console.log("app.js cargado (v2)");

const form = document.getElementById("formTarea");
const input = document.getElementById("inputTarea");
const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");
const lista = document.getElementById("lista");
const resumen = document.getElementById("resumen");
const btnLimpiar = document.getElementById("btnLimpiar");

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = tipo; // "error" u "ok"
}

function crearItem(texto) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = texto;

  const btnMarcar = document.createElement("button");
  btnMarcar.type = "button";
  btnMarcar.textContent = "Marcar";
  btnMarcar.className = "marcar";

  const btnBorrar = document.createElement("button");
  btnBorrar.type = "button";
  btnBorrar.textContent = "Borrar";
  btnBorrar.className = "borrar";

  li.append(span, btnMarcar, btnBorrar);
  return li;
}

function actualizarResumen() {
  const hechas = lista.querySelectorAll("li.hecha").length;
  resumen.textContent =
    hechas + " de " + lista.children.length + " tareas completadas";
}

// Evento 1
input.addEventListener("input", function () {
  contador.textContent = input.value.length + " / " + input.maxLength;
});

// Evento 2
form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const texto = input.value.trim();

  if (texto.length < 3) {
    mostrarMensaje("Escribe al menos 3 caracteres.", "error");
    input.focus();
    return;
  }

  lista.appendChild(crearItem(texto));
  mostrarMensaje("Tarea agregada.", "ok");
  form.reset();
  contador.textContent = "0 / " + input.maxLength;
  actualizarResumen();
});

// Evento 3
lista.addEventListener("click", function (evento) {
  const li = evento.target.closest("li");
  if (!li) return;

  if (evento.target.classList.contains("borrar")) {
    li.remove();
  } else if (evento.target.classList.contains("marcar")) {
    li.classList.toggle("hecha");
  } else {
    return;
  }
  actualizarResumen();
});

btnLimpiar.addEventListener("click", function () {
  lista.querySelectorAll("li.hecha").forEach(function (li) {
    li.remove();
  });
  actualizarResumen();
});

actualizarResumen();
