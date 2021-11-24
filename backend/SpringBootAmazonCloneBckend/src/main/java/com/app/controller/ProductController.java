package com.app.controller;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.customExceptions.UnexpectedErrorException;
import com.app.dto.ResponseDTO;
import com.app.models.Products;
import com.app.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductController {
    @Autowired
    IProductService productService;

    public ProductController() {
        System.out.println("in ProductController -- " + getClass().getName());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/list") /*--------------------------------------------- Admin get All Product List Done-------------------------------------------------*/
    public ResponseDTO getAllProductList() {
        System.out.println("in  get all Product list");
        return new ResponseDTO(true, productService.getAllProducts());
    }

    @GetMapping("/galleryList") /*---------------------------------------------getGalleryProductList Done-------------------------------------------------*/
    public ResponseDTO getGalleryProductList() {
        System.out.println("in  get gallery Product list");
        return new ResponseDTO(true, productService.getGalleryProducts());
    }


    @GetMapping("/details/{prod_id}")/*---------------------------------------------getProduct Done-------------------------------------------------*/
    public ResponseDTO getProduct(@PathVariable String prod_id) {
        System.out.println("in  get Product details");
        Products product = productService.getProductDetails(Integer.parseInt(prod_id));
        if (product != null) {
            return new ResponseDTO(true, product);
        }
        throw new ResourceNotFoundException("Product not found for given product id");
    }

    @PostMapping("/add")/*--------------------------------------------- Admin addNewProduct Done-------------------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO addNewProduct(@RequestBody Products product) {
        System.out.println("in  add new Product : " + product);
        Products prod = productService.addProducts(product);
        if (prod != null) {
            return new ResponseDTO(true, "Product added successfully");
        }
        throw new UnexpectedErrorException("Error while adding new  product");
    }

    @PutMapping("/update/{prod_id}")/*--------------------------------------------- Admin updateProduct Done-------------------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO updateProduct(@RequestBody Products product, @PathVariable String prod_id) {
        System.out.println("in  update Product : ");
        Products prod = productService.updateProducts(Integer.parseInt(prod_id), product);
        if (prod != null) {
            return new ResponseDTO(true, "Product Updated successfully");
        }
        throw new UnexpectedErrorException("Error while Updating  product");
    }

    @DeleteMapping("/delete/{prod_id}")/*--------------------------------------------- Admin deleteProduct Done-------------------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO deleteProduct(@PathVariable String prod_id) throws IOException {
        System.out.println("in  Delete Product");
        return new ResponseDTO(true, productService.deleteProducts(Integer.parseInt(prod_id)));
    }

    @PutMapping("/isActiveStatus/{prodId}/{status}") /*--------------------------------------------- Admin changeProductActiveStatus Done-------------------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO changeProductActiveStatus(@PathVariable String prodId, @PathVariable String status) {
        System.out.println("in change product active status");
        return new ResponseDTO(true, productService.changeProductActiveStatus(Integer.parseInt(prodId), Integer.parseInt(status)));
    }

    @GetMapping("/getImage/{photo}")/*--------------------------------------------- User getProductImage Done-------------------------------------------------*/
    public ResponseEntity<?> getProductImage(@PathVariable String photo) throws IOException {
        System.out.println("in get product image");
        return new ResponseEntity(productService.getPhotoByName(photo), HttpStatus.OK);
    }

    @PutMapping("/uploadImage/{prodId}")/*--------------------------------------------- Admin uploadProductImage Done-------------------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO uploadProductImage(@PathVariable String prodId, @RequestParam("productImage") MultipartFile multipartFile) throws IOException {
        System.out.println("in upload product image");
        return new ResponseDTO(true, productService.uploadProductImage(Integer.parseInt(prodId), multipartFile));
    }

    @DeleteMapping("/imageDelete/{prodId}")/*--------------------------------------------- Admin deleteProductImage Done-------------------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO deleteProductImage(@PathVariable String prodId) throws IOException {
        System.out.println("in delete product image");
        return new ResponseDTO(true, productService.deleteProductImage(Integer.parseInt(prodId)));
    }

}
