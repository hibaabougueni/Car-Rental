package com.car.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;

import com.car.exception.VehiculeException;
import com.car.model.Category;
import com.car.model.Vehicule;

public interface VehiculeService {

	//for admin
	public Vehicule addVehicule(Vehicule vehicule);
	public String deleteVehicule(Long vehiculeId) throws VehiculeException;
	public Vehicule updateVehicule(Long vehiculeId, Vehicule newVehicule) throws VehiculeException;
	public List<Vehicule> getAllVehicules();
	public String deleteVehiculeByCat(Category category);
	
	//for user and admin
	public Vehicule findVehiculeById(Long i) throws VehiculeException;
	public List<Vehicule> findVehiculeByCategory(String category)throws VehiculeException;
	public Page<Vehicule> getAllVehiculesByProp(String category, String model,
			 List<String> color,  Integer minPrice,
			 Integer maxPrice,  Integer pageNum,  Integer pageSize, Boolean availability,
			 String engineType,  String transmission, String sort, Integer minDiscount);
	public List<Vehicule> searchVehicule(String query) throws VehiculeException;
	public List<Vehicule> getAvailableVehicules(LocalDateTime pickupDate, LocalDateTime returnDate);
}
