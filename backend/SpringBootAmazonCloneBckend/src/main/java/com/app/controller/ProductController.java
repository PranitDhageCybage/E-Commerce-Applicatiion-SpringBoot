package com.app.controller;

import com.app.pojo.Category;
import com.app.pojo.Products;
import com.app.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductController {
    @Autowired
    IProductService productService;

    public ProductController() {
        System.out.println("in " + getClass().getName());
    }

    @GetMapping("/list")
    public ResponseEntity getAllProductList() {
        System.out.println("in  get all Product list");
        return new ResponseEntity(productService.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/details/{prod_id}")
    public ResponseEntity getProduct(@PathVariable String prod_id) {
        System.out.println("in  get Product details");
        return new ResponseEntity(productService.getProductDetails(Integer.parseInt(prod_id)), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity addNewProduct(@RequestBody Products product) {
        System.out.println("in  add new Product : " + product);
        return new ResponseEntity(productService.addProducts(product), HttpStatus.OK);
    }

    @PutMapping("/update/{prod_id}")
    public ResponseEntity updateProduct(@RequestBody Products product, @PathVariable String prod_id) {
        System.out.println("in  update Product : " );
        return new ResponseEntity(productService.updateProducts(Integer.parseInt(prod_id), product), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{prod_id}")
    public ResponseEntity deleteProduct(@PathVariable String prod_id) {
        System.out.println("in  Delete Product");
        return new ResponseEntity(productService.deleteProducts(Integer.parseInt(prod_id)), HttpStatus.OK);
    }

    @PutMapping("/isActiveStatus/{prod_id}/{status}")
    public ResponseEntity changeProductActiveStatus(@PathVariable String prod_id, @PathVariable String status) {
        System.out.println("in change product active status");
        return new ResponseEntity(productService.changeProductActiveStatus(Integer.parseInt(prod_id), Integer.parseInt(status)), HttpStatus.OK);
    }

}
