package com.car.service;

import java.util.List;
import java.util.Optional;

import com.car.exception.ExceptionClass;
import com.car.model.Category;

public interface CategoryService {
	
	public Category addCategory(Category c);
	public Category updateCategory(int id, Category c) throws ExceptionClass;
	public String deleteCategory(int id) throws ExceptionClass;
	public List<Category> getAllCategories();
	public Category findCategoryById(int id) throws ExceptionClass;
}
