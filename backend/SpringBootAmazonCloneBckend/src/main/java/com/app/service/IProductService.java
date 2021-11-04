package com.app.service;

import com.app.pojo.Products;

import java.util.List;

public interface IProductService {
    List<Products> getAllProducts();

    Products addProducts(Products product);

    Products updateProducts(int prodId, Products product);

    String deleteProducts(int prodId);

    Products getProductDetails(int prodId);

    String changeProductActiveStatus(int prod_id, int status);

    Integer countAllProduct();
}
