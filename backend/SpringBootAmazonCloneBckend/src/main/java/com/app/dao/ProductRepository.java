package com.app.dao;

import com.app.pojo.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Products, Integer> {
    @Query(value = "SELECT COUNT(*) FROM product", nativeQuery = true)
    Integer countAllProduct();
}
