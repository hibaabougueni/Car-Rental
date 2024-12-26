package com.car.serviceImp;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.car.dto.ReviewDto;
import com.car.exception.VehiculeException;
import com.car.model.Rating;
import com.car.model.Review;
import com.car.model.UserEntity;
import com.car.model.Vehicule;
import com.car.repository.ReviewRepository;
import com.car.service.ReviewService;
import com.car.service.UserService;
import com.car.service.VehiculeService;

@Service
public class ReviewServiceImp implements ReviewService {
	
	private ReviewRepository reviewRep;
	private VehiculeService vehiculeServ;

	@Autowired
	public ReviewServiceImp(ReviewRepository reviewRep, VehiculeService vehiculeServ) {
		this.reviewRep = reviewRep;
		this.vehiculeServ = vehiculeServ;
	}

	@Override
	public Review createReview(ReviewDto review, UserEntity user) throws VehiculeException {
		Review r= new Review();
		Vehicule v= vehiculeServ.findVehiculeById(review.getVehiculeId());
		r.setUser(user);
		r.setCreatedAt(LocalDateTime.now());
		r.setReview(review.getReview());
		r.setVehicule(v);
		r.setRating(review.getRating());
		
		return reviewRep.save(r);
	}

	@Override
	public List<Review> vehiculeReviews(Long vehiculeId) throws VehiculeException {
		Vehicule v= vehiculeServ.findVehiculeById(vehiculeId);
		List<Review> reviews=reviewRep.findAllByVehicule(v);
		return reviews;
	}

}
