package com.app.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "add_id")
    @JsonProperty("add_id")
    private Integer addId;

    @Column(name = "address")
    @JsonProperty("address")
    private String address;

    @Column(name = "city")
    @JsonProperty("city")
    private String city;

    @Column(name = "state")
    @JsonProperty("state")
    private String state;

    @Column(name = "country")
    @JsonProperty("country")
    private String country;

    @Column(name = "pin")
    @JsonProperty("pin")
    private String pin;

    // userId column
    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne
    private User user;

    // F.K in opposite
    @JsonIgnore
    @OneToMany(mappedBy = "address", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Myorder> myorders;

}
