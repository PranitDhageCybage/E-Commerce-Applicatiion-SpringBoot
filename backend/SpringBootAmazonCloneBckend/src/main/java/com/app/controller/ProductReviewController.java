package com.app.controller;

import com.app.pojo.Address;
import com.app.pojo.ProductReview;
import com.app.service.IProductReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/review")
public class ProductReviewController {
    @Autowired
    IProductReviewService reviewService;

    public ProductReviewController() {
        System.out.println("in ProductReviewController -- " + getClass().getName());
    }

    @GetMapping("/list/{prod_id}")
    public ResponseEntity getAllProductReviewList(@PathVariable String prod_id) {
        System.out.println("in get all product review list");
        return new ResponseEntity(reviewService.getAllProductReviews(Integer.parseInt(prod_id)), HttpStatus.OK);
    }

    @GetMapping("/average/{prod_id}")
    public ResponseEntity getAverageProductRating(@PathVariable String prod_id) {
        System.out.println("in get average product rating");
        return new ResponseEntity(reviewService.getAverageOfProductReview(Integer.parseInt(prod_id)), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity addNewReview(@RequestBody ProductReview review) {
        System.out.println("in add new review");
        return new ResponseEntity(reviewService.addNewProductReview(review), HttpStatus.OK);
    }

}
