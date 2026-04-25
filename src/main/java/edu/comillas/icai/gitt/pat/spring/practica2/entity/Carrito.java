package edu.comillas.icai.gitt.pat.spring.practica2.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long idCarrito;
    @Column(nullable = false, unique = true)
    private String nombre;
    @Column(nullable = false)
    private Long idUsuario;
    @Column(nullable = false)
    private String mail;
    @Column(nullable = false)
    private float PrecioTotal;
    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<LineaCarrito> lineasCarrito = new ArrayList<>();

    public List<LineaCarrito> getLineasCarrito() {
        return lineasCarrito;
    }

    public void setLineasCarrito(List<LineaCarrito> lineasCarrito) {
        this.lineasCarrito = lineasCarrito;
    }

    public void setidUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setPrecioTotal(float precioTotal) {
        PrecioTotal = precioTotal;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public Long getidUsuario() {
        return idUsuario;
    }

    public String getMail() {
        return mail;
    }

    public float getPrecioTotal() {
        return PrecioTotal;
    }
}
