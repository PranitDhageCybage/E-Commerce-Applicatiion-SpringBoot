package com.app.pojo;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Data
@Entity
@Table(name = "product")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_id")
    @JsonProperty("prod_id")
    private Integer prodId;

    @Column(name = "prod_title")
    @JsonProperty("prod_title")
    private String prodTitle;

    @Column(name = "prod_description")
    @JsonProperty("prod_description")
    private String prodDescription;

    @Column(name = "prod_price")
    @JsonProperty("prod_price")
    private Float prodPrice;

    @Column(name = "prod_qty")
    @JsonProperty("prod_qty")
    private Integer prodQty;

    @Column(name = "photo")
    @JsonProperty("photo")
    private String photo;

    @JoinColumn(name = "cat_id", nullable = false)
    @ManyToOne(optional = false)
    private Category category;

    @JoinColumn(name = "comp_id", nullable = false)
    @ManyToOne(optional = false)
    private Company company;

    @Column(name = "is_active", columnDefinition = "integer default 1 ")
    @JsonProperty("is_active")
    private Integer isActive;

    @CreationTimestamp
    @JsonProperty("added_on")
    @Column(name = "added_on", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
}
