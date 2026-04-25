package edu.comillas.icai.gitt.pat.spring.practica2.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import edu.comillas.icai.gitt.pat.spring.practica2.entity.LineaCarrito;

public interface RepoLineaCarrito extends CrudRepository<LineaCarrito,Long> {
    
    @Modifying
    @Query("DELETE FROM LineaCarrito l WHERE l.carrito.idCarrito = :idCarrito")
    void borrarPorIdCarrito(@Param("idCarrito") Long idCarrito);
    
}
