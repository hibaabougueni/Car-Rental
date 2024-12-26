package com.car.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.car.model.Rating;
import com.car.model.Vehicule;

public interface RatingRepository extends JpaRepository<Rating,Integer>{

	public List<Rating> findAllByVehicule(Vehicule v);
}
