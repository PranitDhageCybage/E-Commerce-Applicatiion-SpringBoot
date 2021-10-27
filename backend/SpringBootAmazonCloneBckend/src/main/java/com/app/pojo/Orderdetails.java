package com.app.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "orderdetails")
public class Orderdetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderdetails_id")
    private Integer orderdetailsId;

    @Column(name = "price")
    private Float price;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "comment")
    private String comment;

    @JsonIgnore
    @JoinColumn(name = "myorder_id", nullable = false)
    @OneToOne(cascade = CascadeType.ALL, optional = false, orphanRemoval = true)
    private Myorder myorder;

    @JoinColumn(name = "prod_id", nullable = false)
    @ManyToOne(optional = false)
    private Products product;

}
