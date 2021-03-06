package com.app.service;

import com.app.repository.ProductReviewRepository;
import com.app.models.ProductReview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProductReviewServiceImpl implements IProductReviewService{
    @Autowired
    ProductReviewRepository reviewRepo;

    @Override
    public List<ProductReview> getAllProductReviews(int prodId) {
            return reviewRepo.findAllByProductProdId(prodId);
    }

    @Override
    public double getAverageOfProductReview(int prodId) {
            return reviewRepo.getAverageOfProductReview(prodId);
    }

    @Override
    public ProductReview addNewProductReview(ProductReview review) {
        return reviewRepo.save(review);
    }
}
