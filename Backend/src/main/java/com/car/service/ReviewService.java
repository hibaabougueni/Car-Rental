package com.car.service;

import java.util.List;

import com.car.dto.ReviewDto;
import com.car.exception.VehiculeException;
import com.car.model.Review;
import com.car.model.UserEntity;

public interface ReviewService {

	public Review createReview(ReviewDto review, UserEntity user) throws VehiculeException;
	public List<Review> vehiculeReviews(Long vehiculeId) throws VehiculeException;
}
