// FUNCIONALIDAD DEL CATALOGO DE PRODUCTOS

// INICIALIZAR AL CARGAR LA PAGINA
window.addEventListener('DOMContentLoaded', function() {
    if (!idCarritoActual) {
        crearCarrito('Carrito Usuario', 1, 'usuario@mrmilan.com').then(() => {
            agregarEventListenersBotones();
        });
    } else {
        agregarEventListenersBotones();
    }
});

// AGREGAR EVENT LISTENERS A LOS BOTONES
function agregarEventListenersBotones() {
    const botones = document.querySelectorAll('button.btn-small');

    botones.forEach((boton, indice) => {
        boton.addEventListener('click', function (evento) {
            evento.preventDefault();
            capturarEventoAgregarAlCarrito(this, indice);
        });
    });

    console.log(`${botones.length} botones de agregar al carrito configurados`);
}

// CAPTURAR EVENTO CLIC DEL BOTON - extrae datos del HTML y agrega al carrito
function capturarEventoAgregarAlCarrito(boton, indice) {
    // El boton está dentro de un <article class="product">
    const productoArticle = boton.closest('article.product');

    if (!productoArticle) {
        console.error('No se encontró el producto asociado al botón');
        return;
    }

    // Extraer datos del producto del HTML
    const titulo = productoArticle.querySelector('h3')?.textContent.trim();
    const precioTexto = productoArticle.querySelector('.product-price')?.textContent.trim();

    // Validar que obtuvimos los datos
    if (!validarDatosProducto(titulo, precioTexto)) {
        return;
    }

    // Convertir precio: "0,50 EUR" -> 0.50
    const precio = parseFloat(precioTexto.replace(',', '.').replace(' EUR', ''));
    const idArticulo = titulo.toLowerCase().replace(/\s+/g, '_'); // Convertir "Pack de 6 lapices" a "pack_de_6_lapices"
    const cantidad = 1;

    // Agregar el artículo al carrito
    agregarArticuloAlCarrito(idArticulo, precio, cantidad).then(() => {
        mostrarMensajeExito(boton, `"${titulo}" agregado al carrito`);
        refrescarCarritoDOM();
    }).catch(error => {
        mostrarMensajeError(boton, 'Error al agregar el artículo');
        console.error(error);
    });
}

// VALIDAR LOS DATOS DEL PRODUCTO - comprueba que titulo y precio no esten vacios
function validarDatosProducto(titulo, precioTexto) {
    if (!titulo || titulo.length === 0) {
        console.error('Título del producto no encontrado');
        return false;
    }

    if (!precioTexto || precioTexto.length === 0) {
        console.error('Precio del producto no encontrado');
        return false;
    }

    const precio = parseFloat(precioTexto.replace(',', '.').replace(' EUR', ''));
    if (isNaN(precio) || precio <= 0) {
        console.error('Precio inválido:', precioTexto);
        return false;
    }

    return true;
}

// MOSTRAR MENSAJE DE EXITO - crear div verde con checkmark
function mostrarMensajeExito(boton, mensaje) {
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

// MOSTRAR MENSAJE DE ERROR - crear div rojo con X
function mostrarMensajeError(boton, mensaje) {
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