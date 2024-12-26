package com.car.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.car.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer>{

}
