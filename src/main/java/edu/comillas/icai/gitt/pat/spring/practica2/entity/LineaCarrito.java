package edu.comillas.icai.gitt.pat.spring.practica2.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class LineaCarrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public Long idLineaCarrito;

    @ManyToOne
    @JoinColumn(name = "idCarrito", nullable = false)
    @JsonBackReference
    public Carrito carrito;

    @Column(nullable = false) 
    public String idArticulo;
    @Column(nullable = false) 
    public float precioUnidad;
    @Column(nullable = false) 
    public int numUnidades;
    @Column(nullable = false) 
    public float costeLineaArticulo;

}
