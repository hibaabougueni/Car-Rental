package com.car.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.car.exception.VehiculeException;
import com.car.model.Category;
import com.car.model.Vehicule;
import com.car.response.ApiResponse;
import com.car.service.VehiculeService;

@RestController
@RequestMapping("/api/vehicules")
public class VehiculeController {
	
	private VehiculeService vehiculeService;

	@Autowired
	public VehiculeController(VehiculeService vehiculeService) {
		this.vehiculeService = vehiculeService;
	}

	@GetMapping("/category/{category}")
	public ResponseEntity<List<Vehicule>> findByCat(@PathVariable String category) throws VehiculeException{
		List<Vehicule> vehicules= vehiculeService.findVehiculeByCategory(category);
		return new ResponseEntity<List<Vehicule>>(vehicules, HttpStatus.ACCEPTED);
	}
	//is working
	@GetMapping("/")
	public ResponseEntity<Page<Vehicule>> findVehiculeByProp(@RequestParam(required = false) String category,
			@RequestParam(required = false) String model, @RequestParam(required = false) List<String> colors, @RequestParam(required = false) Integer minPrice,
			@RequestParam(required = false) Integer maxPrice, @RequestParam(required = false) Integer pageNum, @RequestParam(required = false) Integer pageSize, @RequestParam(required = false) Boolean availability,
			@RequestParam(required = false) String engineType, @RequestParam(required = false) String transmission, @RequestParam(required = false) String sort, @RequestParam(required = false) Integer minDiscount){
		
		Page<Vehicule> res= vehiculeService.getAllVehiculesByProp(category, model, colors, minPrice, maxPrice, pageNum, pageSize, availability, 
				engineType, transmission, sort,minDiscount);
		return new ResponseEntity<Page<Vehicule>>(res, HttpStatus.ACCEPTED);
	}
	
	//is working
	@GetMapping("/id/{id}")
	public ResponseEntity<Vehicule> findVehiculeById(@PathVariable Long id) throws VehiculeException{
		Vehicule res= vehiculeService.findVehiculeById(id);
		return new ResponseEntity<Vehicule>(res, HttpStatus.ACCEPTED);
	}
	
	//is working
	@GetMapping("/search")
	public ResponseEntity<List<Vehicule>> searchVehicule(@RequestParam String query) throws VehiculeException{
		List<Vehicule> res= vehiculeService.searchVehicule(query);
		return new ResponseEntity<List<Vehicule>>(res,HttpStatus.OK);
	}
	
	//is working 
	@PostMapping("/admin/add")
	public ResponseEntity<Vehicule> addVehicule(@RequestBody Vehicule vehicule){
		Vehicule newVehicule = vehiculeService.addVehicule(vehicule);
		return new ResponseEntity<Vehicule>(newVehicule, HttpStatus.OK);
	}
	
	//Is working
	@DeleteMapping("/admin/{id}/delete")
	public ResponseEntity<ApiResponse> deleteVehicule(@PathVariable Long id) throws VehiculeException {
		String msg= vehiculeService.deleteVehicule(id);
		ApiResponse res=new ApiResponse(msg,true);
		return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);
	}
	// is working
	@GetMapping("/admin")
	public ResponseEntity<List<Vehicule>> findAllVehicules(){
		List<Vehicule> vehicules= vehiculeService.getAllVehicules();
		return new ResponseEntity<List<Vehicule>>(vehicules,HttpStatus.OK);
	}
	
	//is working
	@PutMapping("/admin/{id}/update")
	public ResponseEntity<Vehicule> updateVehicule(@PathVariable Long id, @RequestBody Vehicule v) throws VehiculeException{
		Vehicule newVehicule= vehiculeService.updateVehicule(id, v);
		return new ResponseEntity<Vehicule>(newVehicule, HttpStatus.OK);
	}
	
	
	@GetMapping("/available")
	public ResponseEntity<List<Vehicule>> findAvailableVehicules(
	    @RequestParam("pickupDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime pickupDate,
	    @RequestParam("returnDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime returnDate) {
	    List<Vehicule> vehicules = vehiculeService.getAvailableVehicules(pickupDate, returnDate);
	    return new ResponseEntity<>(vehicules, HttpStatus.OK);
	}
	
	
	
	
	
	
	
}
