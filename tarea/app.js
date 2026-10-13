// VERSION 1: solo DOM (sin eventos, sin clases)
console.log("app.js cargado (v1)");

const lista = document.getElementById("lista");
const resumen = document.getElementById("resumen");

const tareas = [
  "Estudiar JavaScript",
  "Terminar el laboratorio de Java",
  "Repasar derivadas",
];

for (const texto of tareas) {
  const li = document.createElement("li");
  li.textContent = texto;
  lista.appendChild(li);
}

lista.children[1].classList.add("hecha");

lista.removeChild(lista.children[2]);

const hechas = lista.querySelectorAll("li.hecha").length;
resumen.textContent =
  hechas + " de " + lista.children.length + " tareas completadas";
