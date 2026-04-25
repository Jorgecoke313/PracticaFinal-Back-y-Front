package edu.comillas.icai.gitt.pat.spring.practica2.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import edu.comillas.icai.gitt.pat.spring.practica2.entity.LineaCarrito;
import edu.comillas.icai.gitt.pat.spring.practica2.servicio.ServicioLineaCarrito;


@RestController
@CrossOrigin(origins = "*")

public class ControladorLineaCarrito {
    @Autowired
    ServicioLineaCarrito servicioLinea;
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @PostMapping("/api/carrito/{idCarrito}/linea")
    @ResponseStatus(HttpStatus.CREATED)
    public LineaCarrito aniadeLinea(@PathVariable long idCarrito, @RequestBody LineaCarrito lineaNueva){
        logger.info("Añadiendo línea al carrito con ID: " + idCarrito);
        return servicioLinea.aniade(idCarrito, lineaNueva);
    }

    @DeleteMapping("/api/carrito/{idCarrito}/linea/{lineaId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void borrarLinea(@PathVariable long idCarrito, @PathVariable long lineaId){
        logger.info("Borrando linea " + lineaId + " del carrito con ID: " + idCarrito);
        servicioLinea.borrar(idCarrito, lineaId);
    }

    @DeleteMapping("/api/carrito/{idCarrito}/vaciar")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void vaciarCarrito(@PathVariable long idCarrito){
        logger.info("Vaciando carrito con ID: " + idCarrito);
        servicioLinea.vaciarCarrito(idCarrito);
    }

}
