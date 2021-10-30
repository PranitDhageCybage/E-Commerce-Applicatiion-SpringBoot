package com.app.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
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


    @Column(name = "total_price")
    @JsonProperty("total_price")
    private Float totalPrice;

    @Column(name = "tax")
    @JsonProperty("tax")
    private Float tax;

    @Column(name = "payment_type")
    @JsonProperty("payment_type")
    private String paymentType;

    @Column(name = "payment_status")
    @JsonProperty("payment_status")
    private String paymentStatus;

    @Column(name = "delivery_status")
    @JsonProperty("delivery_status")
    private String deliveryStatus;

    // userId col
    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false)
    private User user;

    // addId col
    @JoinColumn(name = "add_id", nullable = false)
    @ManyToOne(optional = false)
    private Address address;

    @JsonIgnore
    @OneToMany(mappedBy = "myorder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetails> orderDetails;

}
