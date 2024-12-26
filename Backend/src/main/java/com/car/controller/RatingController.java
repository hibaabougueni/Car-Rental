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

import com.car.dto.RatingDto;
import com.car.exception.UserException;
import com.car.exception.VehiculeException;
import com.car.model.Rating;
import com.car.model.UserEntity;
import com.car.service.RatingService;
import com.car.service.UserService;

@RestController
@RequestMapping("/api/rating")
public class RatingController {

	private RatingService ratingServ;
	private UserService userServ;
	
	@Autowired
	public RatingController(RatingService ratingServ, UserService userServ) {
		this.ratingServ = ratingServ;
		this.userServ = userServ;
	}
	
	@PostMapping("/add")
	public ResponseEntity<Rating> addReating(@RequestBody RatingDto rating, @RequestHeader("Authorization") String jwt) throws UserException, VehiculeException{
		Optional<UserEntity> user= userServ.findUserProfileByJwt(jwt);
		if(user.isPresent()) {
			UserEntity u= user.get();
			Rating r= ratingServ.createRating(rating, u);
			return new ResponseEntity<Rating>(r,HttpStatus.OK);
		}
		else {
			throw new UserException("User not found");
		}
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<List<Rating>> findAllratings(@PathVariable Long id) throws VehiculeException{
		List<Rating> ratings= ratingServ.getVehiculeRating(id);
		return new ResponseEntity<List<Rating>>(ratings, HttpStatus.OK);
	}
	
	
}
