package com.app.pojo;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pay_id")
    private Integer payId;

    @Column(name = "pay_amount")
    private Float payAmount;

    @Column(name = "pay_date")
    private String payDate;

    @Column(name = "pay_type")
    private Integer payType;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false)
    private User user;

    @JoinColumn(name = "myorder_id", nullable = false)
    @OneToOne(cascade = CascadeType.ALL, optional = false, orphanRemoval = true)
    private Myorder myorder;

}
