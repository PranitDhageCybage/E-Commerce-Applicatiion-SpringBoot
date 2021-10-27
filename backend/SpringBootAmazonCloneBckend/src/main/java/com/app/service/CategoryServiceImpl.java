package com.app.service;

import com.app.dao.CategoryRepository;
import com.app.pojo.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService {

    @Autowired
    CategoryRepository categoryRepo;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    @Override
    public Category addCategory(Category category) {
        return categoryRepo.save(category);
    }

    @Override
    public Category updateCategory(int cat_id, Category newCategory) {
       Category oldCategory= categoryRepo.findById(cat_id).get();
        if (newCategory.getCatTitle() != "") oldCategory.setCatTitle(newCategory.getCatTitle());
        if (newCategory.getCatDescription() != "") oldCategory.setCatDescription(newCategory.getCatDescription());
        return categoryRepo.save(oldCategory);
    }

    @Override
    public String  deleteCategory(int cat_id) {
         categoryRepo.deleteById(cat_id);
         return "Category Deleted Successfully";
    }
}
