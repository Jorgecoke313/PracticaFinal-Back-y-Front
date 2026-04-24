package edu.comillas.icai.gitt.pat.spring.practica2.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.comillas.icai.gitt.pat.spring.practica2.entity.Carrito;
import edu.comillas.icai.gitt.pat.spring.practica2.entity.LineaCarrito;
import edu.comillas.icai.gitt.pat.spring.practica2.repositorio.RepoCarrito;
import edu.comillas.icai.gitt.pat.spring.practica2.repositorio.RepoLineaCarrito;
import jakarta.transaction.Transactional;

@Service
public class ServicioLineaCarrito {
    
    @Autowired
    RepoCarrito repoCarrito;
    @Autowired
    RepoLineaCarrito repoLinea;


    @Transactional
    public LineaCarrito aniade(Long idCarrito, LineaCarrito lineaNueva) {
        Carrito carrito = repoCarrito.findById(idCarrito).orElse(null);
        if(carrito == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        lineaNueva.carrito = carrito;   //Asocio a lineaCarrito el carrito al que pertenece
        return repoLinea.save(lineaNueva);
    }

    @Transactional
    public void borrar(Long idCarrito, Long lineaId){
        Carrito carrito = repoCarrito.findById(idCarrito).orElse(null);
        if(carrito == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no encontrado");
        }

        LineaCarrito linea = repoLinea.findById(lineaId).orElse(null);
        if (linea == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Linea no encontrada");
        }

        if (linea.carrito == null || !idCarrito.equals(linea.carrito.idCarrito)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "La linea no pertenece al carrito");
        }

        repoLinea.delete(linea);
    }

}
