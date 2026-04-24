package edu.comillas.icai.gitt.pat.spring.practica2.entity;

import jakarta.persistence.*;

@Entity
public class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) public Long idCarrito;
    @Column(nullable = false, unique = true) private String nombre;
    @Column(nullable = false) private Long idUsuario;
    @Column(nullable = false) private String mail;
    @Column(nullable = false) private float PrecioTotal;
    

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
