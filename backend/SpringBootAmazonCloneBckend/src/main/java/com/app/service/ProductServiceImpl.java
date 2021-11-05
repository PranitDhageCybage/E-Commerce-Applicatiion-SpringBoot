package com.app.service;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dao.ProductRepository;
import com.app.pojo.Products;
import com.app.utils.ImageUploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
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
        return productRepo.findById(prodId).orElseThrow(() -> new ResourceNotFoundException("Product  not found for given Product Id : " + prodId));
    }

    @Override
    public String changeProductActiveStatus(int prod_id, int status) {
        Products product = productRepo.findById(prod_id).orElseThrow(() -> new ResourceNotFoundException("Product  not found for given Product Id : " + prod_id));
        product.setIsActive(status);
        productRepo.save(product);
        return "Product Active status changed";
    }

    @Override
    public Integer countAllProduct() {
        return productRepo.countAllProduct();
    }

    @Override
    public String uploadProductImage(int prodId, MultipartFile file) throws IOException {
        Products product = productRepo.findById(prodId).orElseThrow(() -> new ResourceNotFoundException("Product  not found for given Product Id : " + prodId));
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        product.setPhoto(fileName);
        productRepo.save(product);
        String uploadDir = "src/main/resources/product-photos/";
        ImageUploadUtils.saveFile(uploadDir, fileName, file);
        return "Image Uploaded Successfully";
    }

    @Override
    public String deleteProductImage(int prodId) throws IOException {
        Products product = productRepo.findById(prodId).orElseThrow(() -> new ResourceNotFoundException("Product not found for given product id"));
        String uploadDir = "src/main/resources/product-photos/";
        ImageUploadUtils.deleteFile(uploadDir, product.getPhoto());
        product.setPhoto(null);
        return "Product image deleted successfully";
    }
}
