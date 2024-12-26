package com.car.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.car.model.Review;
import com.car.model.Vehicule;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
	public List<Review> findAllByVehicule(Vehicule v);
	
	@Query("SELECT r FROM Review r JOIN FETCH r.user WHERE r.id = :id")
    Review findByIdWithUser(@Param("id") int id);
}
