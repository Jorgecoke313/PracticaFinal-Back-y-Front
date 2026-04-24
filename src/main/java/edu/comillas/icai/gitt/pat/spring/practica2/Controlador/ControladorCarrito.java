package edu.comillas.icai.gitt.pat.spring.practica2.Controlador;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import edu.comillas.icai.gitt.pat.spring.practica2.entity.Carrito;
import edu.comillas.icai.gitt.pat.spring.practica2.entity.LineaCarrito;
import edu.comillas.icai.gitt.pat.spring.practica2.servicio.ServicioCarrito;


@RestController 

public class ControladorCarrito {
 
    private final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    ServicioCarrito servicioCarrito;
    @PostMapping("/api/carrito") 
    @ResponseStatus(HttpStatus.CREATED) // Si todo va bien responde con un código 201 (CREATED) indicando que el recurso se ha creado correctamente.
    public Carrito crea(@RequestBody Carrito carritoNuevo) { 
        logger.info("Creando un nuevo carrito con nombre: " + carritoNuevo.getNombre());
        return servicioCarrito.crear(carritoNuevo);
    }

    
    @GetMapping("/api/carrito/{idCarrito}") 
    public Carrito buscar(@PathVariable long idCarrito) { 
        logger.info("Buscando carrito con ID: " + idCarrito);
        return servicioCarrito.lee(idCarrito);
    }

    @PutMapping("/api/carrito/{idCarrito}")
    public Carrito actualizar(@PathVariable long idCarrito, @RequestBody Carrito carritoActualizado) { // PathVariable devuelve el ID del carrito que aparece al final de la URL, y RequestBody
        logger.info("Actualizando carrito con ID: " + idCarrito);
        return servicioCarrito.actualizar(idCarrito, carritoActualizado); 
    }

    @DeleteMapping("/api/carrito/{idCarrito}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void borrar(@PathVariable long idCarrito) {
        logger.info("Borrando carrito con ID: " + idCarrito);
        servicioCarrito.borrar(idCarrito);
    }


}
