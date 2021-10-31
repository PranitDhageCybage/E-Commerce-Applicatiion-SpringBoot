package com.app.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "user")
@JsonIgnoreProperties(value = {"password"}, allowSetters = true)  //it will not send password to client side
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

    @JsonProperty(value = "password" )
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


    @CreationTimestamp
    @JsonProperty("signedUp_on")
    @Column(name = "signedUp_on", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;


    // FOR P.K in another side
    @JsonIgnore        // to ignore this property during signin causing lazy init
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses;

    @JsonIgnore        // to ignore this property during signin causing lazy init
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cart> carts;

    @JsonIgnore        // to ignore this property during signin causing lazy init
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Myorder> myorders;

}