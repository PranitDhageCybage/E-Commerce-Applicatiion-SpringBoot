package com.app.dao;

import com.app.pojo.ProductReview;
import com.app.pojo.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, Integer> {
    List<ProductReview> findAllByProduct(Products product);

    @Query("SELECT AVG(p.rating) FROM ProductReview p WHERE p.product.prodId = :prodId")
    double getAverageOfProductReview(@Param("prodId") int prodId);
}
