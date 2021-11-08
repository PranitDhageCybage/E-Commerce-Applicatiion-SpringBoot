package com.app.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    @JsonProperty("cart_id")
    private Integer cartId;

    @Column(name = "cart_quantity")
    @JsonProperty("cart_quantity")
    private Integer cartQuantity = 1;

    // userId column
    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false)
    private User user;

    @JoinColumn(name = "prod_id", nullable = false)
    @ManyToOne(optional = false)
    private Products product;

    @CreationTimestamp
    @JsonProperty("added_on")
    @Column(name = "added_on", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
}
