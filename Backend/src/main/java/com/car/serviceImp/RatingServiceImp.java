package com.car.serviceImp;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.car.dto.RatingDto;
import com.car.exception.VehiculeException;
import com.car.model.Rating;
import com.car.model.UserEntity;
import com.car.model.Vehicule;
import com.car.repository.RatingRepository;
import com.car.service.RatingService;
import com.car.service.UserService;
import com.car.service.VehiculeService;

@Service
public class RatingServiceImp implements RatingService{

	private RatingRepository ratingRep;
	private VehiculeService vehiculeServ;
	
	@Autowired
	public RatingServiceImp(RatingRepository ratingRep, VehiculeService vehiculeServ) {
		this.ratingRep = ratingRep;
		this.vehiculeServ = vehiculeServ;
	}

	@Override
	public Rating createRating(RatingDto ratingDTO, UserEntity user) throws VehiculeException {
		Rating r= new Rating();
		Vehicule v= vehiculeServ.findVehiculeById(ratingDTO.getVehiculeId());
		r.setUser(user);
		r.setCreatedAt(LocalDateTime.now());
		r.setRating(ratingDTO.getRating());
		r.setVehicule(v);
		
		return ratingRep.save(r);
	}

	@Override
	public List<Rating> getVehiculeRating(Long vehiculeId) throws VehiculeException {
		Vehicule v= vehiculeServ.findVehiculeById(vehiculeId);
		List<Rating> ratings=ratingRep.findAllByVehicule(v);
		return ratings;
	}
	
	
	
	
	
}
