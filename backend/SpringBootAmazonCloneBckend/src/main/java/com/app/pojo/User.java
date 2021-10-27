package com.app.pojo;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Data
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("user_id")
    @Column(name = "user_id")
    private Integer userId;

    @JsonProperty("name")
    @Column(name = "user_name")
    @NotNull(message = "User Name can not be Null")
    private String userName;

    @JsonProperty("phone")
    @Column(name = "user_phone")
    @NotNull(message = "Phone can not be Null")
    private String userPhone;

    @JsonProperty("email")
    @Column(name = "user_email")
    @NotNull(message = "Email can not be Null")
    private String userEmail;

    @JsonProperty("password")
    @Column(name = "user_password")
    @NotNull(message = "Password can not be Null")
    private String userPassword;

    @JsonProperty("status")
    @Column(name = "user_status")
    private Integer userStatus;

    @Enumerated(value = EnumType.STRING)
    @JsonProperty("role")
    @Column(name = "user_role", columnDefinition = "varchar(30) default 'USER'")
    private Role userRole;


    // FOR P.K in another side
    @JsonIgnore        // to ignore this property during signin causing lazy init
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses;

    @JsonIgnore        // to ignore this property during signin causing lazy init
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cart> carts;

    @JsonIgnore        // to ignore this property during signin causing lazy init
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> payments;

    @JsonIgnore        // to ignore this property during signin causing lazy init
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Myorder> myorders;

}