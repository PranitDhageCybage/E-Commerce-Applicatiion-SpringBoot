package com.app.controller;

import com.app.customExceptions.UnexpectedErrorException;
import com.app.dto.ResponseDTO;
import com.app.models.ProductReview;
import com.app.service.IProductReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("/list/{prod_id}")/*-------------------------------------------------------getAllProductReviewList Done------------------------------------------------ */
    public ResponseDTO getAllProductReviewList(@PathVariable String prod_id) {
        System.out.println("in get all product review list");
        return new ResponseDTO(true, reviewService.getAllProductReviews(Integer.parseInt(prod_id)));
    }

    @GetMapping("/average/{prod_id}")/*-------------------------------------------------------getAverageProductRating Done------------------------------------------------ */
    public ResponseDTO getAverageProductRating(@PathVariable String prod_id) {
        System.out.println("in get average product rating");
        double avgRating = reviewService.getAverageOfProductReview(Integer.parseInt(prod_id));
        if (avgRating != 0) {
            return new ResponseDTO(true, avgRating);
        }
        throw new UnexpectedErrorException(" Average  product review not found for given product");
    }

    @PostMapping("/add")/*-------------------------------------------------------User addNewReview Done------------------------------------------------ */
    @PreAuthorize("hasRole('USER')")
    public ResponseDTO addNewReview(@RequestBody ProductReview review) {
        System.out.println("in add new review");
        ProductReview productReview = reviewService.addNewProductReview(review);
        if (productReview != null) {
            return new ResponseDTO(true, "product Review added successfully");
        }
        throw new UnexpectedErrorException("Error while adding new  product Review");
    }

}
