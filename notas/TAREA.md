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

```
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
```

Qué agregué

- La clase Tarea con constructor, tres atributos (id, texto, completada) y dos métodos (alternar y descripcion).
- La clase ListaTareas con un arreglo de objetos Tarea y los métodos agregar, buscar, alternar, eliminar, existe, limpiarCompletadas y contarCompletadas.
- La función validar, que ahora también detecta tareas repetidas.
- La función render, que dibuja la página completa a partir de los objetos.
- Cada (li) guarda el id de su tarea en data-id, para saber qué objeto modificar al hacer clic.

Por qué

Para separar los datos (objetos) de la forma en que se muestran (DOM). Antes la página era la fuente de la verdad; ahora lo es el arreglo de objetos, y el DOM solo se redibuja a partir de él. Eso hace el código más ordenado y más fácil de ampliar.

Qué cambió en el comportamiento

Visualmente casi todo es igual, con tres diferencias: no se aceptan tareas repetidas (aparece el mensaje "Esa tarea ya está en la lista."), el botón de marcar cambia entre "Marcar" y "Desmarcar" según el estado, y en la consola aparece la descripción de cada tarea nueva.

## Donde uso DOM, eventos y objetos

| Pieza  | Linea de tu codigo donde aparece                                                                   |
| ------ | -------------------------------------------------------------------------------------------------- |
| DOM    | `const lista = document.getElementById("lista");` (también `lista.appendChild(crearItem(tarea));`) |
| Evento | `form.addEventListener("submit", function (evento) {`.                                             |
| Objeto | `const tarea = new Tarea(texto);` (también `const listaTareas = new ListaTareas();`)               |

## Pruebas realizadas

| Acción                                                                | Resultado esperado                                                                               | Resultado obtenido                                                                                      | Cumple (Sí/No) |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | -------------- |
| Escribir "Estudiar JavaScript" y presionar Agregar                    | La tarea aparece en la lista y se muestra el mensaje verde "Tarea agregada."                     | La tarea aparece en la lista, el mensaje verde se muestra y el resumen dice "0 de 1 tareas completadas" | Sí             |
| Escribir "ab" (menos de 3 caracteres) y presionar Agregar             | Mensaje rojo "Escribe al menos 3 caracteres." y la tarea no se agrega                            | Aparece el mensaje rojo y la lista no cambia                                                            | Sí             |
| Escribir "estudiar javascript" cuando ya existe "Estudiar JavaScript" | Mensaje rojo "Esa tarea ya está en la lista." y no se agrega                                     | Aparece el mensaje rojo y no se duplica la tarea                                                        | Sí             |
| Presionar "Marcar" en una tarea                                       | La tarea se tacha, el botón cambia a "Desmarcar" y el resumen sube a "1 de 1 tareas completadas" | La tarea se tacha, el botón cambia y el resumen se actualiza                                            | Sí             |
| Presionar "Borrar" en una tarea                                       | La tarea desaparece de la lista y el resumen se actualiza                                        | La tarea desaparece y el resumen vuelve a "0 de 0 tareas completadas"                                   | Sí             |

## Por que disene asi mi clase

Diseñé la clase Tarea con tres atributos porque son los datos mínimos que necesita una tarea para funcionar en la página. id identifica cada tarea de forma única: así, cuando el usuario hace clic en “Borrar” o “Marcar”, sé exactamente qué objeto modificar, incluso si hay dos tareas con textos parecidos. texto guarda lo que escribió el usuario y completada guarda si la tarea ya se hizo, con un valor true o false. Los métodos son dos, y cada uno hace una sola cosa: alternar() cambia el estado de completada, de modo que el mismo método sirve para marcar y para desmarcar, y descripcion() devuelve un texto con el estado y el nombre de la tarea, que me sirve para mostrar información en la consola. Además creé la clase ListaTareas, que guarda el arreglo de objetos Tarea y reúne las acciones sobre el conjunto (agregar, eliminar, existe y otras).
