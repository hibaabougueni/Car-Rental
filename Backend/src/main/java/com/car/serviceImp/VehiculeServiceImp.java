package com.car.serviceImp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.car.exception.VehiculeException;
import com.car.model.Category;
import com.car.model.Vehicule;
import com.car.repository.VehiculeRepository;
import com.car.service.VehiculeService;

@Service
public class VehiculeServiceImp implements VehiculeService{

	@Autowired
	private VehiculeRepository vehiculeRep;
	
	@Override
	public Vehicule addVehicule(Vehicule vehicule) {
		Vehicule savedVehicule= vehiculeRep.save(vehicule);
		System.out.println("Vehicule "+ vehicule.getId()+" was succsefully added");
		return savedVehicule;
	}

	@Override
	public String deleteVehicule(Long vehiculeId) throws VehiculeException {
		Vehicule v=findVehiculeById(vehiculeId);
		vehiculeRep.delete(v);
		return ("Vehicule "+ vehiculeId +"was succesfully deleted");
	}

	@Override
	public Vehicule updateVehicule(Long vehiculeId, Vehicule newVehicule) throws VehiculeException {
		Vehicule v=findVehiculeById(vehiculeId);
		v.setAc(newVehicule.isAc());
		v.setAvailability(newVehicule.isAvailability());
		v.setBrand(newVehicule.getBrand());
		v.setCategory(newVehicule.getCategory());
		v.setColor(newVehicule.getColor());
		v.setDiscountedPrice(newVehicule.getDiscountedPrice());
		v.setDiscountPercent(newVehicule.getDiscountPercent());
		v.setDoors(newVehicule.getDoors());
		v.setEngineType(newVehicule.getEngineType());
		v.setGps(newVehicule.isGps());
		v.setImageURL(newVehicule.getImageURL());
		v.setModel(newVehicule.getModel());
		v.setSeats(newVehicule.getSeats());
		v.setTransmission(newVehicule.getTransmission());
		v.setTrunkCapacity(newVehicule.getTrunkCapacity());
		v.setYear(newVehicule.getYear());
		Vehicule updatedVehicule= vehiculeRep.save(v);
		System.out.println("Vehicule "+ vehiculeId+" was succesfully updated.");
		return updatedVehicule;
	}

	@Override
	public List<Vehicule> getAllVehicules() {
		return vehiculeRep.findAll();
	}

	@Override
	public Vehicule findVehiculeById(Long vehiculeId) throws VehiculeException {
		Optional<Vehicule> v=vehiculeRep.findById(vehiculeId);
		if(v.isPresent()) {
			return v.get();
		}
		else {
			throw new VehiculeException("Vehicule not found with id "+vehiculeId);
		}
	}

	@Override
	public List<Vehicule> findVehiculeByCategory(String category) throws VehiculeException {
		Optional< List<Vehicule> > vehicules=vehiculeRep.findByCategory(category);
		if(vehicules.isPresent()) {
			return vehicules.get();
		}
		throw new VehiculeException("No vehicule in the category " + category);
	}

//	@Override
//	public Page<Vehicule> getAllVehiculesByProp(String category, String model, List<String> colors, Integer minPrice, Integer maxPrice,
//			Integer pageNum, Integer pageSize, boolean availability, String engineType, String transmission, String sort, Integer minDiscount) {
//		
//		int page = (pageNum != null) ? pageNum : 0; // Default to page 0 if null
//	    int size = (pageSize != null) ? pageSize : 10; 
//	    
//		Pageable pageable=PageRequest.of(page, size);
//		List<Vehicule> vehicules = vehiculeRep.filterVehicules(category, model, transmission, engineType, minPrice,maxPrice, minDiscount, sort);
//		
//		if (colors !=null) {
//			vehicules = vehicules.stream()
//			        .filter(v -> colors.stream().anyMatch(c -> c.equalsIgnoreCase(v.getColor())))
//			        .collect(Collectors.toList());
//		}
//		if(availability) {
//			vehicules=vehicules.stream().filter(v->v.isAvailability()==true).collect(Collectors.toList());
//		}
//		if(!availability) {
//			vehicules=vehicules.stream().filter(v->v.isAvailability()==false).collect(Collectors.toList());
//		}
//		
//		int startIndex = (int) pageable.getOffset();
//		int endIndex = Math.min(startIndex + pageable.getPageSize(), vehicules.size());
//
//		List<Vehicule> pageContent = vehicules.subList(startIndex, endIndex);
//		Page<Vehicule> filteredVehicules = new PageImpl<>(pageContent, pageable, vehicules.size());
//	    return filteredVehicules; 
//	
//
//}
	@Override
	public Page<Vehicule> getAllVehiculesByProp(String category, String model, List<String> colors, Integer minPrice, Integer maxPrice,
		Integer pageNum, Integer pageSize, Boolean availability, String engineType, String transmission, String sort, Integer minDiscount) {

	    int page = (pageNum != null) ? pageNum : 0; // Default to page 0 if null
	    int size = (pageSize != null) ? pageSize : 10; // Default to page size 10 if null

	    Pageable pageable = PageRequest.of(page, size);
	    List<Vehicule> vehicules = vehiculeRep.filterVehicules(category, model, transmission, engineType, minPrice, maxPrice, minDiscount, sort);

	    // Filter by colors if provided
	    if (colors != null && !colors.isEmpty()) {
	        vehicules = vehicules.stream()
	                .filter(v -> colors.stream().anyMatch(c -> c.equalsIgnoreCase(v.getColor())))
	                .collect(Collectors.toList());
	    }

	    // Filter by availability if provided
	    if (availability != null) {
	        vehicules = vehicules.stream()
	                .filter(v -> v.isAvailability() == availability)
	                .collect(Collectors.toList());
	    }

	    // Handle pagination
	    int startIndex = (int) pageable.getOffset();
	    int endIndex = Math.min(startIndex + pageable.getPageSize(), vehicules.size());

	    List<Vehicule> pageContent = vehicules.subList(startIndex, endIndex);
	    Page<Vehicule> filteredVehicules = new PageImpl<>(pageContent, pageable, vehicules.size());
	    
	    return filteredVehicules;
	}


	@Override
	public List<Vehicule> searchVehicule(String query) throws VehiculeException{
		List<Vehicule> vehicules= vehiculeRep.searchVehiculeByProp(query);
		if(vehicules!= null) {
			return vehicules;
		}
		throw new VehiculeException("No vehicule with this description");
	}

	@Override
	public String deleteVehiculeByCat(Category category) {
		Optional<List<Vehicule>> vehicules= vehiculeRep.findByCategory(category.getName());
		if(vehicules.isPresent()) {
			List<Vehicule> v=vehicules.get();
		    v.forEach(vehicule -> vehiculeRep.delete(vehicule));
		}
		return "Vehicules deleted";
	}

	@Override
	public List<Vehicule> getAvailableVehicules(LocalDateTime pickupDate, LocalDateTime returnDate) {
        return vehiculeRep.findAvailableVehicules(pickupDate, returnDate);
	}

}

