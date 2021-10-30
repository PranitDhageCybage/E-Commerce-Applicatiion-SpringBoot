package com.app.service;

import com.app.dao.ProductRepository;
import com.app.pojo.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements IProductService {

    @Autowired
    ProductRepository productRepo;

    @Override
    public List<Products> getAllProducts() {
        return productRepo.findAll();
    }

    @Override
    public Products addProducts(Products product) {
        return productRepo.save(product);
    }

    @Override
    public Products updateProducts(int prodId, Products newProduct) {
        Products oldProduct = productRepo.findById(prodId).get();
        if (newProduct.getProdTitle() != null) oldProduct.setProdTitle(newProduct.getProdTitle());
        if (newProduct.getProdDescription() != null) oldProduct.setProdDescription(newProduct.getProdDescription());
        if (newProduct.getProdPrice() != null) oldProduct.setProdPrice(newProduct.getProdPrice());
        if (newProduct.getProdQty() != null) oldProduct.setProdQty(newProduct.getProdQty());
        if (newProduct.getPhoto() != null) oldProduct.setPhoto(newProduct.getPhoto());
        if (newProduct.getCategory() != null) oldProduct.setCategory(newProduct.getCategory());
        if (newProduct.getCompany() != null) oldProduct.setCompany(newProduct.getCompany());
        return productRepo.save(oldProduct);
    }

    @Override
    public String deleteProducts(int prodId) {
        if (productRepo.existsById(prodId)) {
            productRepo.deleteById(prodId);
            return "Product Deleted Successfully";
        }
        return "Product not Found";
    }

    @Override
    public Products getProductDetails(int prodId) {
        if (productRepo.existsById(prodId)) {
            return productRepo.findById(prodId).get();
        }
        return null;
    }
}
