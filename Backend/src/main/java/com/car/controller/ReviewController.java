package com.car.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.car.dto.ReviewDto;
import com.car.exception.UserException;
import com.car.exception.VehiculeException;
import com.car.model.Review;
import com.car.model.UserEntity;
import com.car.service.ReviewService;
import com.car.service.UserService;

@RestController
@RequestMapping("/api/review")
public class ReviewController {
	
	private ReviewService reviewServ;
	private UserService userServ;
	
	@Autowired
	public ReviewController(ReviewService reviewServ, UserService userServ) {
		this.reviewServ = reviewServ;
		this.userServ = userServ;
	}
	
	@PostMapping("/add")
	public ResponseEntity<Review> addReview(@RequestBody ReviewDto review, @RequestHeader("Authorization") String jwt) throws UserException, VehiculeException{
		Optional<UserEntity> user= userServ.findUserProfileByJwt(jwt);
		if(user.isPresent()) {
			UserEntity u= user.get();
			Review r= reviewServ.createReview(review, u);
			return new ResponseEntity<Review>(r,HttpStatus.OK);
		}
		else {
			throw new UserException("User not found");
		}
	}
	
	//to be removed
	@PostMapping("/add/id/{id}")
	public ResponseEntity<Review> addReview(@RequestBody ReviewDto review, @PathVariable Integer id) throws UserException, VehiculeException{
		UserEntity user= userServ.finduserById(id);
		Review r= reviewServ.createReview(review, user);
		return new ResponseEntity<Review>(r,HttpStatus.OK);
		
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<List<Review>> findAllReviews(@PathVariable Long id) throws VehiculeException{
		List<Review> reviews= reviewServ.vehiculeReviews(id);
		return new ResponseEntity<List<Review>>(reviews, HttpStatus.OK);
	}
	
	
		
}
