// GESTION DEL CARRITO DE COMPRA

let idCarritoActual = null; // variable para guardar el ID del carrito que estamos usando

// funcion para inicializar el carrito desde localStorage
function inicializarCarrito() { // cuando se carga la pagina, intentar recuperar el carrito guardado
    const idGuardado = localStorage.getItem('idCarritoActual'); // sacar del localStorage el ID si existe
    if (idGuardado) { // si hay ID guardado
        idCarritoActual = parseInt(idGuardado); // convertir de texto a numero
        console.log('Carrito recuperado del localStorage con ID:', idCarritoActual); // mostrar en consola
    }
}

// Llamar a inicializar cuando se carga el script
inicializarCarrito(); // ejecutar la funcion de inicializacion

// Funcion para crear un nuevo carrito
async function crearCarrito(nombre, idUsuario, mail) { // parametros: nombre del carrito, id usuario, email
    try {
        const datosCarrito = { // crear objeto con los datos del carrito
            nombre: nombre, // nombre del carrito
            idUsuario: idUsuario, // id del usuario
            mail: mail, // email del usuario
            PrecioTotal: 0 // comenzar con precio 0
        };

        const carritoCreado = await llamadaAPI('POST', ENDPOINTS.CARRITO, datosCarrito); // enviar POST al API
        idCarritoActual = carritoCreado.idCarrito; // guardar el ID que devuelve el servidor
        
        // Guardar el ID en localStorage para que persista entre páginas
        localStorage.setItem('idCarritoActual', idCarritoActual); // guardar el ID en el navegador

        console.log('Carrito creado con ID', idCarritoActual); // mostrar mensaje en consola
        return carritoCreado; // devolver el carrito creado
    } catch (error) {
        console.error('Error al crear carrito:', error); // si hay error, mostrarlo
    }
}

// Funcion para obtener los datos del carrito desde el API
async function obtenerCarrito() { // traer los datos actuales del carrito del servidor
    try {
        if (!idCarritoActual) { // si no hay carrito activo
            console.warn('No hay carrito activo'); // avisar
            return null;
        }

        const endpoint = ENDPOINTS.CARRITO + '/' + idCarritoActual; // construir la ruta del carrito
        const carrito = await llamadaAPI('GET', endpoint); // hacer GET al servidor

        console.log('Carrito obtenido', carrito); // mostrar el carrito en consola
        return carrito; // devolver el carrito
    } catch (error) {
        console.error('Error al obtener carrito', error); // si hay error, mostrarlo
    }
}

// Funcion para actualizar la informacion del carrito
async function actualizarCarrito(datosActualizados) { // actualizar datos del carrito en el servidor
    try {
        if (!idCarritoActual) { // si no hay carrito activo
            console.warn('No hay carrito activo'); // avisar
            return null; // devolver nulo
        }

        const endpoint = ENDPOINTS.CARRITO + '/' + idCarritoActual; // construir la ruta del carrito
        const carritoActualizado = await llamadaAPI('PUT', endpoint, datosActualizados); // hacer PUT con los datos nuevos
        console.log('Carrito actualizado:', carritoActualizado); // mostrar en consola
        return carritoActualizado; // devolver el carrito actualizado
    } catch (error) {
        console.error('Error al actualizar carrito:', error); // si hay error, mostrarlo
    }
}
