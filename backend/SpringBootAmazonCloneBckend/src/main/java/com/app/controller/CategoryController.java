package com.app.controller;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.customExceptions.UnexpectedErrorException;
import com.app.pojo.Category;
import com.app.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    ICategoryService categoryService;

    public CategoryController() {
        System.out.println("in " + getClass().getName());
    }

    @GetMapping("/list")
    public ResponseEntity getAllCategoryList() {
        System.out.println("in  get all category list");
        List<Category> categoryList = categoryService.getAllCategories();
        if (categoryList.size() > 0) {
            return new ResponseEntity(categoryList, HttpStatus.OK);
        }
        throw new ResourceNotFoundException("Category list not found");
    }

    @PostMapping("/add")
    public ResponseEntity addNewCategory(@RequestBody Category category) {
        System.out.println("in  add new category");
        Category cat = categoryService.addCategory(category);
        if (cat != null) {
            return new ResponseEntity("Category added successfully", HttpStatus.OK);
        }
        throw new UnexpectedErrorException("Error while adding new  category");
    }

    @PutMapping("/update/{cat_id}")
    public ResponseEntity updateCategory(@RequestBody Category category, @PathVariable String cat_id) {
        System.out.println("in  update category");
        Category cat = categoryService.updateCategory(Integer.parseInt(cat_id), category);
        if (cat != null) {
            return new ResponseEntity("Category Updated successfully", HttpStatus.OK);
        }
        throw new UnexpectedErrorException("Error while updating  category");
    }

    @DeleteMapping("/delete/{cat_id}")
    public ResponseEntity deleteCategory(@PathVariable String cat_id) {
        System.out.println("in  Delete category");
        return new ResponseEntity(categoryService.deleteCategory(Integer.parseInt(cat_id)), HttpStatus.OK);
    }

}
