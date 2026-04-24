package edu.comillas.icai.gitt.pat.spring.practica2.repositorio;

import org.springframework.data.repository.CrudRepository;

import edu.comillas.icai.gitt.pat.spring.practica2.entity.Carrito;

public interface RepoCarrito extends CrudRepository<Carrito, Long> {
    Carrito findByNombre(String nombre);
    
}
