package com.app.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "orderdetails")
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderdetails_id")
    @JsonProperty("orderdetails_id")
    private Integer orderdetailsId;
    @JsonProperty("price")
    @Column(name = "price")
    private Float price;
    @JsonProperty("quantity")
    @Column(name = "quantity")
    private Integer quantity;
    @JsonProperty("total_amount")
    @Column(name = "total_amount")
    private Float totalAmount;
    @JoinColumn(name = "myorder_id", nullable = false)
    @ManyToOne(optional = false)
    private Myorder myorder;

    public OrderDetails() {
    }

    public OrderDetails(Float price, Integer quantity, Float totalAmount, Myorder myorder, Products product) {
        this.price = price;
        this.quantity = quantity;
        this.totalAmount = totalAmount;
        this.myorder = myorder;
        this.product = product;
    }

    @JoinColumn(name = "prod_id", nullable = false)
    @ManyToOne(optional = false)
    private Products product;

}
