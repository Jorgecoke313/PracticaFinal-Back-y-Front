// FUNCIONALIDAD DE LA PAGINA DE ESPECIALES

// INICIALIZAR AL CARGAR LA PAGINA
window.addEventListener('DOMContentLoaded', function() {
    if (!idCarritoActual) {
        crearCarrito('Carrito Usuario', 1, 'usuario@mrmilan.com').then(() => {
            agregarEventListenerEspeciales();
        });
    } else {
        agregarEventListenerEspeciales();
    }
});

// AGREGAR EVENT LISTENER AL BOTON DE ESPECIALES
function agregarEventListenerEspeciales() {
    const seccionEspecial = document.querySelector('.special-card');
    if (!seccionEspecial) {
        console.warn('No se encontró la sección de producto especial');
        return;
    }

    const boton = seccionEspecial.querySelector('button.btn');
    if (!boton) {
        console.warn('No se encontró el botón en la sección especial');
        return;
    }

    boton.addEventListener('click', function(evento) {
        evento.preventDefault();
        capturarEventoAgregarEspecial(this);
    });

    console.log('Botón de producto especial configurado');
}

// CAPTURAR EVENTO CLIC - extrae datos del producto especial y agrega al carrito
function capturarEventoAgregarEspecial(boton) {
    const seccionEspecial = boton.closest('.special-card');
    const titulo = seccionEspecial.querySelector('h3')?.textContent.trim();
    const precioTexto = seccionEspecial.querySelector('.special-price')?.textContent.trim();

    if (!validarDatosProductoEspecial(titulo, precioTexto)) {
        return;
    }

    // Convertir precio: "Precio especial: 1,95 EUR" -> 1.95
    const precioLimpio = precioTexto.replace('Precio especial:', '').trim();
    const precio = parseFloat(precioLimpio.replace(',', '.').replace(' EUR', ''));
    const idArticulo = 'ESPECIAL_BOLI_BORRABLE';
    const cantidad = 1;

    agregarArticuloAlCarrito(idArticulo, precio, cantidad).then(() => {
        mostrarMensajeExitoEspecial(boton, `"${titulo}" agregado al carrito`);
        refrescarCarritoDOM();
    }).catch(error => {
        mostrarMensajeErrorEspecial(boton, 'Error al agregar el artículo');
        console.error(error);
    });
}

// ENVIAR PRODUCTO AL CARRITO
function enviarProductoCarrito(idArticulo, precio, cantidad) {
    return agregarArticuloAlCarrito(idArticulo, precio, cantidad);
}

// MOSTRAR MENSAJE DE EXITO
function mostrarMensajeExitoEspecial(boton, mensaje) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje-exito';
    mensajeDiv.textContent = '✓ ' + mensaje;
    mensajeDiv.style.backgroundColor = '#4CAF50';
    mensajeDiv.style.color = 'white';
    mensajeDiv.style.padding = '10px';
    mensajeDiv.style.marginTop = '10px';
    mensajeDiv.style.borderRadius = '4px';
    mensajeDiv.style.textAlign = 'center';
    
    boton.parentElement.appendChild(mensajeDiv);
    
    setTimeout(() => {
        mensajeDiv.remove();
    }, 2000);
}

// MOSTRAR MENSAJE DE ERROR
function mostrarMensajeErrorEspecial(boton, mensaje) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje-error';
    mensajeDiv.textContent = '✗ ' + mensaje;
    mensajeDiv.style.backgroundColor = '#f44336';
    mensajeDiv.style.color = 'white';
    mensajeDiv.style.padding = '10px';
    mensajeDiv.style.marginTop = '10px';
    mensajeDiv.style.borderRadius = '4px';
    mensajeDiv.style.textAlign = 'center';
    
    boton.parentElement.appendChild(mensajeDiv);
    
    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}

// VALIDAR DATOS DEL PRODUCTO ESPECIAL
function validarDatosProductoEspecial(titulo, precioTexto) {
    if (!titulo || titulo.length === 0) {
        console.error('Título del producto no encontrado');
        return false;
    }
    
    if (!precioTexto || precioTexto.length === 0) {
        console.error('Precio del producto no encontrado');
        return false;
    }

    const precioLimpio = precioTexto.replace('Precio especial:', '').trim();
    const precio = parseFloat(precioLimpio.replace(',', '.').replace(' EUR', ''));
    if (isNaN(precio) || precio <= 0) {
        console.error('Precio inválido:', precioTexto);
        return false;
    }

    return true;
}
