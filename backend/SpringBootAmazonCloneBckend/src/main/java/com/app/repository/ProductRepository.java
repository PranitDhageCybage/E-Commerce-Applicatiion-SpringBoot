package com.app.repository;

import com.app.models.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products, Integer> {

    @Query(value = "SELECT p FROM Products p JOIN FETCH p.category ct JOIN FETCH p.company cp")
    List<Products> findAllProducts();

    @Query(value = "SELECT COUNT(p) FROM Products p")
    Integer countAllProduct();

}
