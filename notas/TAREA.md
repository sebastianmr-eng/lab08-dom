# Tarea: Mi componente interactivo

## Componente elegido

Una lista de tareas donde se pueden agregar, marcar y borrar tareas.

## Version 1: solo DOM

```
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

```

Qué agregué

- Un arreglo con tres textos de ejemplo.
- Un bucle que crea cada <li> con createElement, le pone el texto con textContent y lo agrega con appendChild.
- Una modificación desde el código (classList.add("hecha")) y una eliminación desde el código (removeChild).
- Un resumen que lee el DOM con querySelectorAll y lo escribe en #resumen.

Por qué

Primero quería asegurarme de dominar lo básico: crear, modificar y eliminar elementos de la página solo con JavaScript, sin que el usuario haga nada. Así separo los errores del DOM de los errores de eventos.

Qué cambió en el comportamiento

La página carga con una lista armada por JavaScript: se ven dos tareas (la segunda tachada) y el texto "1 de 2 tareas completadas". Todo es estático: el usuario no puede hacer nada todavía.

## Version 2: con eventos

## Version 3: con clases y objetos

## Donde uso DOM, eventos y objetos

| Pieza  | Linea de tu codigo donde aparece |
| ------ | -------------------------------- |
| DOM    |                                  |
| Evento |                                  |
| Objeto |                                  |

## Pruebas realizadas

| Accción | Resultado esperado | Resultado obtenido | Cumple(Si/No) |
| ------- | ------------------ | ------------------ | ------------- |
|         |                    |                    |               |
|         |                    |                    |               |
|         |                    |                    |               |

## Por que disene asi mi clase
