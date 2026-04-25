// GESTION DE LINEAS DEL CARRITO (cada articulo dentro del carrito)

// AGREGAR UN ARTICULO AL CARRITO - simplemente crea una nueva línea
async function agregarArticuloAlCarrito(idArticulo, precioUnidad, numUnidades) {
    try {
        if (!idCarritoActual) {
            console.warn('No hay carrito activo. Cree uno primero');
            return null;
        }

        const datosLinea = {
            idArticulo: idArticulo,
            precioUnidad: precioUnidad,
            numUnidades: numUnidades,
            costeLineaArticulo: precioUnidad * numUnidades
        };

        const endpoint = ENDPOINTS.LINEA_CARRITO(idCarritoActual);
        const lineaAgregada = await llamadaAPI('POST', endpoint, datosLinea);
        
        console.log('Artículo agregado al carrito:', lineaAgregada);
        return lineaAgregada;
    } catch (error) {
        console.error('Error al agregar artículo:', error);
    }
}
// BORRAR UN ARTICULO DEL CARRITO - elimina la linea del servidor
async function borrarArticuloDelCarrito(lineaId) {
    try {
        if (!idCarritoActual) {
            console.warn('No hay carrito activo');
            return null;
        }

        const endpoint = ENDPOINTS.LINEA_CARRITO(idCarritoActual) + '/' + lineaId;
        const resultado = await llamadaAPI('DELETE', endpoint);

        console.log('Artículo eliminado del carrito:', resultado);
        return resultado;
    } catch (error) {
        console.error('Error al eliminar artículo:', error);
    }
}

// REFRESCAR EL CARRITO EN LA PANTALLA - actualiza la visualizacion del DOM con los datos actuales
async function refrescarCarritoDOM() {
    try {
        // Verificar que el contenedor existe antes de refrescar
        const contenedorCarrito = document.getElementById('carrito-items');
        if (!contenedorCarrito) {
            // Si no existe el elemento, simplemente no hacer nada
            return;
        }

        const carrito = await obtenerCarrito();

        if (!carrito) {
            console.warn('No se pudo obtener el carrito');
            return;
        }

        contenedorCarrito.innerHTML = '';

        if (carrito.lineasCarrito && carrito.lineasCarrito.length > 0) {
            carrito.lineasCarrito.forEach(linea => {
                const itemHTML = `
            <div class="carrito-item" data-linea-id="${linea.idLineaCarrito}">
                <div class="item-info">
                    <p><strong>Artículo:</strong> ${linea.idArticulo}</p>
                    <p><strong>Precio unitario:</strong> ${linea.precioUnidad.toFixed(2)} EUR</p>
                    <p><strong>Cantidad:</strong> ${linea.numUnidades}</p>
                    <p><strong>Subtotal:</strong> ${linea.costeLineaArticulo.toFixed(2)} EUR</p>
                </div>
                <div class="item-acciones">
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${linea.idLineaCarrito})">Eliminar</button>
                </div>
            </div>
        `;
                contenedorCarrito.innerHTML += itemHTML;
            });
        } else {
            contenedorCarrito.innerHTML = '<p>El carrito está vacío</p>';
        }

        console.log('Carrito refrescado en DOM');
    } catch (error) {
        console.error('Error al refrescar carrito en DOM:', error);
    }
}

// ELIMINAR ARTICULO CON CONFIRMACION - funcion auxiliar para el boton eliminar
async function eliminarDelCarrito(lineaId) {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este artículo?');
    if (confirmacion) {
        await borrarArticuloDelCarrito(lineaId);
        await refrescarCarritoDOM();
    }
}
