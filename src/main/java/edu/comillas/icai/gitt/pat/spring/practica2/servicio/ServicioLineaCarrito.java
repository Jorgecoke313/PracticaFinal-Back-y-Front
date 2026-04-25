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
        if (carrito == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        lineaNueva.carrito = carrito;
        carrito.getLineasCarrito().add(lineaNueva);

        // Recalcular el precio total sumando todas las líneas
        float totalNuevo = 0;
        for (LineaCarrito linea : carrito.getLineasCarrito()) {
            totalNuevo += linea.costeLineaArticulo;
        }

        carrito.setPrecioTotal(totalNuevo);
        return repoLinea.save(lineaNueva);
    }

    @Transactional
    public void borrar(Long idCarrito, Long lineaId) {
        Carrito carrito = repoCarrito.findById(idCarrito).orElse(null);
        if (carrito == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no encontrado");
        }

        LineaCarrito linea = repoLinea.findById(lineaId).orElse(null);
        if (linea == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Linea no encontrada");
        }

        if (linea.carrito == null || !idCarrito.equals(linea.carrito.idCarrito)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "La linea no pertenece al carrito");
        }

        // Guardar el costo antes de eliminar
        float costeLinea = linea.costeLineaArticulo;
        
        repoLinea.delete(linea);

        // Restar solo el costo de la línea eliminada
        float totalNuevo = carrito.getPrecioTotal() - costeLinea;
        if (totalNuevo < 0) {
            totalNuevo = 0;
        }
        
        carrito.setPrecioTotal(totalNuevo);
        repoCarrito.save(carrito);
    }

    @Transactional
    public void vaciarCarrito(Long idCarrito) {
        Carrito carrito = repoCarrito.findById(idCarrito).orElse(null);
        if(carrito == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no encontrado");
        }

        // Borrar todas las líneas del carrito con una query
        repoLinea.borrarPorIdCarrito(idCarrito);
        
        // Resetear el precio total a 0
        carrito.setPrecioTotal(0);
        repoCarrito.save(carrito);
    }
}
