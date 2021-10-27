package com.app.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

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
    private String photo;

    @JoinColumn(name = "cat_id", nullable = false)
    @ManyToOne(optional = false)
    private Category category;

    @JoinColumn(name = "comp_id", nullable = false)
    @ManyToOne(optional = false)
    private Company company;

}
