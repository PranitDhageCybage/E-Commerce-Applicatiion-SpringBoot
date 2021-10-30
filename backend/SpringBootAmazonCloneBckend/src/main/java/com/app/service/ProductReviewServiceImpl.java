package com.app.service;

import com.app.dao.ProductRepository;
import com.app.dao.ProductReviewRepository;
import com.app.pojo.ProductReview;
import com.app.pojo.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProductReviewServiceImpl implements IProductReviewService{
    @Autowired
    ProductReviewRepository reviewRepo;

    @Autowired
    ProductRepository productRepo;

    @Override
    public List<ProductReview> getAllProductReviews(int prodId) {
       Products product = productRepo.findById(prodId).get();
        return reviewRepo.findAllByProduct(product);
    }

    @Override
    public double getAverageOfProductReview(int prodId) {
//        Products product = productRepo.findById(prodId).get();
        return reviewRepo.getAverageOfProductReview(prodId);
    }

    @Override
    public ProductReview addNewProductReview(ProductReview review) {
        return reviewRepo.save(review);
    }
}
