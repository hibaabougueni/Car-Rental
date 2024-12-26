package com.car.service;

import java.util.List;

import com.car.dto.RatingDto;
import com.car.exception.VehiculeException;
import com.car.model.Rating;
import com.car.model.UserEntity;

public interface RatingService {
	
	public Rating createRating(RatingDto ratingDTO, UserEntity user) throws VehiculeException;
	
	public List<Rating> getVehiculeRating(Long vehiculeId) throws VehiculeException;
}
