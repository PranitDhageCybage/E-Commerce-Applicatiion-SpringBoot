package com.app.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "product_review")
public class ProductReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("review_id")
    @Column(name = "review_id")
    private Integer userId;

    @JsonProperty("review")
    @Column(name = "review")
    private  String review;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false)
    private User user;

    @JoinColumn(name = "prod_id", nullable = false)
    @ManyToOne(optional = false)
    private Products product;

    @JsonProperty("rating")
    @Column(name = "rating")
    private  Integer rating;

    @CreationTimestamp
    @JsonProperty("reviewed_on")
    @Column(name = "reviewed_on", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

}
