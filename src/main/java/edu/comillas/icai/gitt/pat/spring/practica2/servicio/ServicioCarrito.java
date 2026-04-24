package edu.comillas.icai.gitt.pat.spring.practica2.servicio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.comillas.icai.gitt.pat.spring.practica2.entity.Carrito;
import edu.comillas.icai.gitt.pat.spring.practica2.repositorio.RepoCarrito;
import edu.comillas.icai.gitt.pat.spring.practica2.repositorio.RepoLineaCarrito;
import jakarta.transaction.Transactional;



@Service
public class ServicioCarrito {
    @Autowired
    RepoCarrito repoCarrito;
    @Autowired
    RepoLineaCarrito repoLinea;

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Transactional
    public Carrito crear(Carrito carrito){
        if(repoCarrito.findByNombre(carrito.getNombre())!=null){
            logger.warn("Intento de creación de carrito con un nombre ya existente: " + carrito.getNombre());
            throw new ResponseStatusException(HttpStatus.CONFLICT); //El carrito ya existe, CONFLICT es un error tipo 409, que indica que el recurso ya existe y no se puede crear de nuevo.
        }
        Carrito newCarrito = repoCarrito.save(carrito);
        return newCarrito;
    }


    public Carrito lee(Long idCarrito){
        Carrito carrito = repoCarrito.findById(idCarrito).orElse(null);

        if (carrito == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no encontrado");
        }
        return carrito;
    }


    @Transactional
    public Carrito actualizar(Long idCarrito,Carrito carrito){
        Carrito existente = repoCarrito.findById(idCarrito).orElse(null);
        if(existente==null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        
        existente.setidUsuario(carrito.getidUsuario());
        existente.setMail(carrito.getMail());
        existente.setPrecioTotal(carrito.getPrecioTotal());

        return existente;
    }

    @Transactional
    public void borrar(Long idCarrito) {
        Carrito carrito = repoCarrito.findById(idCarrito).orElse(null);
        if (carrito == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no encontrado");
        }
        repoCarrito.delete(carrito);
    }

    
}
