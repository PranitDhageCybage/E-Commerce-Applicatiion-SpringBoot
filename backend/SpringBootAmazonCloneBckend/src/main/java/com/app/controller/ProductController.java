package com.app.controller;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.customExceptions.UnexpectedErrorException;
import com.app.dto.ResponseDTO;
import com.app.pojo.Products;
import com.app.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductController {
    @Autowired
    IProductService productService;

    public ProductController() {
        System.out.println("in " + getClass().getName());
    }

    @GetMapping("/list") /*--------------------------------------------- Admin get All Product List Done-------------------------------------------------*/
    public ResponseDTO getAllProductList() {
        System.out.println("in  get all Product list");
        List<Products> productsList = productService.getAllProducts();
        if (productsList.size() > 0) {
            return new ResponseDTO(true, productsList);
        }
        throw new ResourceNotFoundException("Product list not found");
    }

    @GetMapping("/details/{prod_id}")
    public ResponseEntity getProduct(@PathVariable String prod_id) {
        System.out.println("in  get Product details");
        Products product = productService.getProductDetails(Integer.parseInt(prod_id));
        if (product != null) {
            return new ResponseEntity(product, HttpStatus.OK);
        }
        throw new ResourceNotFoundException("Product not found for given product id");
    }

    @PostMapping("/add")
    public ResponseEntity addNewProduct(@RequestBody Products product) {
        System.out.println("in  add new Product : " + product);
        Products prod = productService.addProducts(product);
        if (prod != null) {
            return new ResponseEntity("Product added successfully", HttpStatus.OK);
        }
        throw new UnexpectedErrorException("Error while adding new  product");
    }

    @PutMapping("/update/{prod_id}")
    public ResponseEntity updateProduct(@RequestBody Products product, @PathVariable String prod_id) {
        System.out.println("in  update Product : ");
        Products prod = productService.updateProducts(Integer.parseInt(prod_id), product);
        if (prod != null) {
            return new ResponseEntity("Product Updated successfully", HttpStatus.OK);
        }
        throw new UnexpectedErrorException("Error while Updating  product");
    }

    @DeleteMapping("/delete/{prod_id}")/*--------------------------------------------- Admin deleteProduct Done-------------------------------------------------*/
    public ResponseDTO deleteProduct(@PathVariable String prod_id) throws IOException {
        System.out.println("in  Delete Product");
        return new ResponseDTO(true, productService.deleteProducts(Integer.parseInt(prod_id)));
    }

    @PutMapping("/isActiveStatus/{prodId}/{status}") /*--------------------------------------------- Admin changeProductActiveStatus Done-------------------------------------------------*/
    public ResponseDTO changeProductActiveStatus(@PathVariable String prodId, @PathVariable String status) {
        System.out.println("in change product active status");
        return new ResponseDTO(true, productService.changeProductActiveStatus(Integer.parseInt(prodId), Integer.parseInt(status)));
    }

    @GetMapping("/getImage/{prodId}")
    public ResponseEntity getProductImage(@PathVariable String prodId){
        System.out.println("in get product image");
        return new ResponseEntity("", HttpStatus.OK);
    }

    @PutMapping("/uploadImage/{prodId}")
    public ResponseEntity uploadProductImage(@PathVariable String prodId, @RequestParam("productImage") MultipartFile multipartFile) throws IOException {
        System.out.println("in upload product image");
        return new ResponseEntity(productService.uploadProductImage(Integer.parseInt(prodId), multipartFile), HttpStatus.OK);
    }

    @DeleteMapping("/imageDelete/{prodId}")
    public ResponseEntity deleteProductImage(@PathVariable String prodId) throws IOException {
        System.out.println("in delete product image");
        return new ResponseEntity(productService.deleteProductImage(Integer.parseInt(prodId)), HttpStatus.OK);
    }

}
