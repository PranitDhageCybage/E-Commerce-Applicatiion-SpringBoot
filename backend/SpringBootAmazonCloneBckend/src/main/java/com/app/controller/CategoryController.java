package com.app.controller;

import com.app.pojo.Category;
import com.app.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return new ResponseEntity(categoryService.getAllCategories(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity addNewCategory(@RequestBody Category category) {
        System.out.println("in  add new category");
        return new ResponseEntity(categoryService.addCategory(category), HttpStatus.OK);
    }

    @PutMapping("/update/{cat_id}")
    public ResponseEntity updateCategory(@RequestBody Category category, @PathVariable String cat_id) {
        System.out.println("in  update category");
        return new ResponseEntity(categoryService.updateCategory(Integer.parseInt(cat_id), category), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{cat_id}")
    public ResponseEntity deleteCategory(@PathVariable String cat_id) {
        System.out.println("in  Delete category");
        return new ResponseEntity(categoryService.deleteCategory(Integer.parseInt(cat_id)), HttpStatus.OK);
    }

}
