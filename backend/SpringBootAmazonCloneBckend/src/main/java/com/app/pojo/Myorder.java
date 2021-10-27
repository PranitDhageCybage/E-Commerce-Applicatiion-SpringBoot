package com.app.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "myorder")
public class Myorder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "myorder_id")
    @JsonProperty("myorder_id")
    private Integer myorderId;

    @Column(name = "orderDate")
    private String orderDate;

    @Column(name = "status", columnDefinition = "int default 0")
    @JsonProperty("status")
    private Integer status = 0;

    @Column(name = "total_price")
    private Float totalPrice;

    // userId col
    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false)
    private User user;

    // addId col
    @JoinColumn(name = "add_id", nullable = false)
    @ManyToOne(optional = false)
    private Address address;

    @OneToMany(mappedBy = "myorder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orderdetails> orderDetails;

}
