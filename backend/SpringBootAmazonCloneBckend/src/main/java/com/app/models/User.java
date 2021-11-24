package com.app.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(	name = "user",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "user_name"),
                @UniqueConstraint(columnNames = "user_email")
        })
@JsonIgnoreProperties(value = {"password"}, allowSetters = true)  //it will not send password to client side
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("user_id")
    @Column(name = "user_id")
    private Integer userId;

    @JsonProperty("name")
    @Column(name = "user_name", length = 25)
    @NotBlank(message = "Name is required")
    @Length(min = 3, max = 25, message = "Invalid len of Name")
    private String userName;

    @JsonProperty("phone")
    @Column(name = "user_phone")
    @NotBlank(message = "Phone can not be Null")
    private String userPhone;

    @JsonProperty("email")
    @Column(name = "user_email")
    @Email(message = "Email can not be Null")
    private String userEmail;

    @JsonProperty(value = "password")
//    @Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", message = "Blank or Invalid password")
    @NotBlank(message = "Password can not be Blank")
    @Column(name = "user_password", length = 100, nullable = false)
    private String userPassword;

    @JsonProperty("status")
    @Column(name = "user_status", columnDefinition = "integer default 1")
    private Integer userStatus;

/*
    @Enumerated(value = EnumType.STRING)
    @JsonProperty("role")
    @Column(name = "user_role", columnDefinition = "varchar(30) default 'USER'")
    private ERole userERole;
*/
@ManyToMany(fetch = FetchType.EAGER)
@JoinTable(	name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"))
private Set<Role> roles = new HashSet<>();

    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
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

    public User() {
    }

    public User(Integer userId, String userName, String userPhone, String userEmail, String userPassword, Integer userStatus,
                Set<Role> roles, Date date, List<Address> addresses, List<Cart> carts, List<Myorder> myorders) {
        this.userId = userId;
        this.userName = userName;
        this.userPhone = userPhone;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userStatus = userStatus;
        this.roles = roles;
        this.date = date;
        this.addresses = addresses;
        this.carts = carts;
        this.myorders = myorders;
    }

    public User(String username, String email, String phone,  String encode) {
        this.userName = username;
        this.userEmail = email;
        this.userPhone = phone;
        this.userPassword = encode;
        this.userStatus = 1;
    }
}