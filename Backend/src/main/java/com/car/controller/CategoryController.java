package com.car.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.car.exception.ExceptionClass;
import com.car.model.Category;
import com.car.service.CategoryService;
import com.car.service.VehiculeService;

@RestController
@RequestMapping("api/category")
public class CategoryController {
	
	private CategoryService categoryService;
	
	@Autowired
	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	
	@PostMapping("/add")
	public ResponseEntity<String> addCat(@RequestBody Category c){
		Category newCat= categoryService.addCategory(c);
		return new ResponseEntity<String>("Category added successfully", HttpStatus.OK);
	}
	
	@PutMapping("/update/id/{id}")
	public ResponseEntity<Category> updateCat(@PathVariable int id, @RequestBody Category c) throws ExceptionClass{
		Category newCat= categoryService.updateCategory(id, c);
		return new ResponseEntity<Category>(newCat, HttpStatus.OK);
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<Category> findCatById(@PathVariable int id) throws ExceptionClass{
		Category cat= categoryService.findCategoryById(id);
		return new ResponseEntity<Category>(cat, HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Category>> findAll(){
		List<Category> categories= categoryService.getAllCategories();
		return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/id/{id}")
	public ResponseEntity<String> deleteCat(@PathVariable int id) throws ExceptionClass{
		String msg= categoryService.deleteCategory(id);
		return new ResponseEntity<String>(msg, HttpStatus.OK);
	}
	
	

}
