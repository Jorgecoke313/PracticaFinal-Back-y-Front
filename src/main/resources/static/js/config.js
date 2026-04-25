
// CONFIGURACION GENERAL DEL API

const API_BASE_URL = 'http://localhost:8080/api';

const ENDPOINTS = {
    CARRITO: '/carrito',
    LINEA_CARRITO: (idCarrito) => `/carrito/${idCarrito}/linea`
};

//Funcion auxiliar para hacer llamadas a la API
// esta funcion hace todas las peticiones HTTP (GET, POST, PUT, DELETE)

async function llamadaAPI(metodo, endpoint, datos = null) {
    try {
        const url = API_BASE_URL + endpoint;
        const opciones = {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (datos) {
            opciones.body = JSON.stringify(datos);
        }

        const respuesta = await fetch(url, opciones);

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }

        if (respuesta.status == 204) {
            return { exito: true, mensaje: 'Operacion completada' };
        }

        const datos_respuesta = await respuesta.json();
        return datos_respuesta;

    } catch (error) {
        console.error('Error en llamada al API:', error);
        throw error;
    }
}

