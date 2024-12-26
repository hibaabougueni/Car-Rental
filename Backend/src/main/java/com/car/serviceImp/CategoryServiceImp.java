package com.car.serviceImp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.car.exception.ExceptionClass;
import com.car.model.Category;
import com.car.repository.CategoryRepository;
import com.car.service.CategoryService;
import com.car.service.VehiculeService;

@Service
public class CategoryServiceImp implements CategoryService{

	private CategoryRepository categoryRep;
	private VehiculeService vehiculeService;
	
	@Autowired
	public CategoryServiceImp(CategoryRepository categoryRep, VehiculeService vehiculeService) {
		this.categoryRep = categoryRep;
		this.vehiculeService=vehiculeService;
	}
	
	@Override
	public Category addCategory(Category c) {
		Category category= categoryRep.save(c);
		return category;
	}

	@Override
	public Category updateCategory(int id, Category c) throws ExceptionClass {
		Category category= findCategoryById(id);
		category.setName(c.getName());
		category.setImgURL(c.getImgURL());
		Category updatedCategory= categoryRep.save(category);
		return updatedCategory;
	}

	@Override
	public String deleteCategory(int id) throws ExceptionClass {
		Category category= findCategoryById(id);
		vehiculeService.deleteVehiculeByCat(category);
		categoryRep.delete(category);
		return "Category deleted successfully";
	}

	@Override
	public List<Category> getAllCategories() {
		List<Category> categories= categoryRep.findAll();
		return categories;
	}

	@Override
	public Category findCategoryById(int id) throws ExceptionClass {
		Optional<Category> cat=categoryRep.findById(id);
		if(cat.isPresent()) {
			return cat.get();
		}
		throw new ExceptionClass("category Not Found");
		
	}

}
