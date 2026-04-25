// GESTION DEL CARRITO DE COMPRA

let idCarritoActual = null;

function inicializarCarrito() {
    const idGuardado = localStorage.getItem('idCarritoActual');
    if (idGuardado) {
        idCarritoActual = parseInt(idGuardado);
        console.log('Carrito recuperado del localStorage con ID:', idCarritoActual);
    }
}

inicializarCarrito();

// CREAR UN NUEVO CARRITO EN EL SERVIDOR
async function crearCarrito(nombre, idUsuario, mail) {
    try {
        const datosCarrito = {
            nombre: nombre,
            idUsuario: idUsuario,
            mail: mail,
            PrecioTotal: 0
        };

        const carritoCreado = await llamadaAPI('POST', ENDPOINTS.CARRITO, datosCarrito);
        idCarritoActual = carritoCreado.idCarrito;

        localStorage.setItem('idCarritoActual', idCarritoActual);

        console.log('Carrito creado con ID', idCarritoActual);
        return carritoCreado;
    } catch (error) {
        console.error('Error al crear carrito:', error);
    }
}

// OBTENER LOS DATOS DEL CARRITO DESDE EL API
async function obtenerCarrito() {
    try {
        if (!idCarritoActual) {
            console.warn('No hay carrito activo');
            return null;
        }

        const endpoint = ENDPOINTS.CARRITO + '/' + idCarritoActual;
        const carrito = await llamadaAPI('GET', endpoint);

        console.log('Carrito obtenido', carrito);
        return carrito;
    } catch (error) {
        console.error('Error al obtener carrito', error);
    }
}

// ACTUALIZAR LOS DATOS DEL CARRITO EN EL SERVIDOR
async function actualizarCarrito(datosActualizados) {
    try {
        if (!idCarritoActual) {
            console.warn('No hay carrito activo');
            return null;
        }

        const endpoint = ENDPOINTS.CARRITO + '/' + idCarritoActual;
        const carritoActualizado = await llamadaAPI('PUT', endpoint, datosActualizados);
        console.log('Carrito actualizado:', carritoActualizado);
        return carritoActualizado;
    } catch (error) {
        console.error('Error al actualizar carrito:', error);
    }
}