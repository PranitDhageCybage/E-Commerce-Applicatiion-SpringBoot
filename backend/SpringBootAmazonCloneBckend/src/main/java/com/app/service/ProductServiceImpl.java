package com.app.service;

import com.app.customExceptions.ResourceNotFoundException;
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
        if (productRepo.existsById(prodId)) {
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
        throw new ResourceNotFoundException("Product  not found for given Product Id : " + prodId);
    }

    @Override
    public String deleteProducts(int prodId) {
        if (productRepo.existsById(prodId)) {
            productRepo.deleteById(prodId);
            return "Product Deleted Successfully";
        }
        throw new ResourceNotFoundException("Product  not found for given Product Id : " + prodId);
    }

    @Override
    public Products getProductDetails(int prodId) {
        if (productRepo.existsById(prodId)) {
            return productRepo.findById(prodId).get();
        }
        throw new ResourceNotFoundException("Product  not found for given Product Id : " + prodId);
    }

    @Override
    public String changeProductActiveStatus(int prod_id, int status) {
        if (productRepo.existsById(prod_id)) {
            Products product = productRepo.findById(prod_id).get();
            product.setIsActive(status);
            productRepo.save(product);
            return "Product Active status changed";
        }
        throw new ResourceNotFoundException("Product  not found for given Product Id : " + prod_id);
    }

    @Override
    public Integer countAllProduct() {
        return productRepo.countAllProduct();
    }
}
