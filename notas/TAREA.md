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

```
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
```

Qué agregué

Tres tipos de eventos distintos:

- input: actualiza el contador de caracteres mientras escribo.
- submit: valida el texto y agrega la tarea (con preventDefault() para que la página no se recargue).
- click: sobre la lista (delegación de eventos) para marcar o borrar una tarea, y sobre el botón "Borrar completadas".

Por qué

Para que la página responda al usuario. Usé delegación de eventos en #lista porque las tareas se crean después de cargar la página y así no tengo que agregar un listener a cada botón.

Qué cambió en el comportamiento

Ahora el usuario escribe una tarea y la agrega con el botón o con Enter. Ve el contador cambiar al escribir, recibe un mensaje rojo si el texto es muy corto, puede tachar o destacharlas, borrar una tarea o borrar todas las completadas.

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
