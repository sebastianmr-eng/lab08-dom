# Bitacora de JavaScript interactivo

Laboratorio 08: JavaScript Interactivo - DOM, Eventos y Objetos.

Navegador usado: (Mozilla Firefox)

## Ejercicio 2: Seleccionar y modificar el DOM

| Instruccion                  | Que cambio en la pantalla                      | Se mantiene al recargar (Si/No) |
| ---------------------------- | ---------------------------------------------- | ------------------------------- |
| textContent desde la consola | El titulo cambia de nombre                     | No                              |
| textContent desde app.js     | El titulo cambia de nombre                     | Si                              |
| style.color                  | Cambia el color al azul                        | Si                              |
| classList.add                | Crea un fondo amarillo                         | Si                              |
| createElement + appendChild  | Crea un nodo nuevo y lo coloca dentro de otro. | Si                              |

## Ejercicio 3: Evento click

| Tipo de evento | Que accion lo dispara                                        | Cuanto suma por accion |
| -------------- | ------------------------------------------------------------ | ---------------------- |
| click          | Hacer un clic con el mouse sobre el botón “Sumar”            | 1                      |
| dblclick       | Hacer doble clic rápido sobre el elemento                    | 1                      |
| mouseover      | Pasar el puntero del mouse sobre el elemento, sin hacer clic | 1                      |

- evento.type mostró el nombre del evento que ocurrió (por ejemplo, mouseover, click o dblclick).
- evento.target mostró el elemento HTML que recibió el evento.

## Ejercicio 4: Eventos input y submit

| Prueba                                  | Que paso en la pantalla                                  | Se recargo la pagina (Si/No) |
| --------------------------------------- | -------------------------------------------------------- | ---------------------------- |
| Escribir en el campo nombre             | El texto Hola,... cambia letra por letra                 | No                           |
| Enviar sin preventDefault               | El texto enviado aparece apenas un instante y desaparece | Si                           |
| Enviar con preventDefault, correo sin @ | Existe un error: Correo no válido                        | No                           |
| Enviar con preventDefault, correo con @ | Enviado correctamente                                    | No                           |

## Ejercicio 5: Clases y objetos

| Objeto  | nombre  | precio | descripcion()       | conDescuento(0.25) |
| ------- | ------- | ------ | ------------------- | ------------------ |
| laptop  | Laptop  | 2500   | Laptop - S/ 2500.00 | 1875               |
| mouse   | Mouse   | 45     | Mouse - S/ 45.00    | 33.75              |
| teclado | Teclado | 120    | Teclado - S/ 120.00 | 90                 |
| monitor | Monitor | 680    | Monitor - S/ 680.00 | 510                |

Con la clase defines una sola vez la estructura y los métodos (nombre, precio, descripcion(), conDescuento()), y cada producto nuevo se crea con una sola línea (new Producto(...)), sin repetir código.

## Ejercicio 6: DOM, eventos y objetos juntos

| Prueba          | Total que muestra la pagina                         | Correcto (Si/No) |
| --------------- | --------------------------------------------------- | ---------------- |
| Cuaderno 12.50  | S/ 12.50                                            | Si               |
| + Lapicero 3.20 | S/ 15.70                                            | Si               |
| + Mochila 89.90 | S/ 105.60                                           | Si               |
| Sin Number()    | No muestra ningún total nuevo (error en la consola) | No               |

| Pieza  | Linea de tu codigo donde aparece                                                                                      | Para que sirve                                                                                            |
| ------ | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| DOM    | `const formProducto = document.querySelector("#formProducto"); (también listaCarrito.appendChild(li);)`               | Seleccionar y modificar elementos de la página, como leer los campos, agregar un (li) y mostrar el total. |
| Evento | `formProducto.addEventListener("submit", (evento) => {. `                                                             | Ejecutar código cuando el usuario envía el formulario al presionar “Agregar”.                             |
| Objeto | `const producto = new Producto(prodNombre.value, Number(prodPrecio.value)); (también const carrito = new Carrito();)` | Crear un producto con sus datos y métodos ,además de un carrito que guarda y suma los productos.          |
