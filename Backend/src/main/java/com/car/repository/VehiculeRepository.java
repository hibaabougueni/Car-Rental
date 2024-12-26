package com.car.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.car.model.Category;
import com.car.model.Vehicule;

@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule,Long> {
	
	@Query("SELECT v FROM Vehicule v WHERE v.id NOT IN (SELECT oi.vehicule.id FROM OrderItem oi WHERE oi.pickupDate < :returnDate AND oi.returnDate > :pickupDate)")
    List<Vehicule> findAvailableVehicules(@Param("pickupDate") LocalDateTime pickupDate, @Param("returnDate") LocalDateTime returnDate);
	
	@Query("SELECT v FROM Vehicule v Where LOWER(v.category.name)=:category")
	public Optional<List<Vehicule>> findByCategory(@Param("category") String category);
	
	@Query("SELECT v FROM Vehicule v WHERE LOWER(v.model) LIKE %:query%  OR LOWER(v.category.name) LIKE %:query% ")
	public List<Vehicule> searchVehiculeByProp(@Param("query") String query);
	
	@Query("SELECT v FROM Vehicule v "
			+ "WHERE (:category IS NULL OR LOWER(v.category.name) = LOWER(:category)) "
	        + "AND (:model IS NULL OR LOWER(v.model) LIKE %:model%) "
	        + "AND (:transmission IS NULL OR LOWER(v.transmission) = LOWER(:transmission)) "
	        + "AND (:engineType IS NULL OR LOWER(v.engineType) = LOWER(:engineType)) "
			+ "AND ((:minPrice IS NULL AND :maxPrice IS NULL) OR (v.discountedPrice BETWEEN :minPrice AND :maxPrice)) "
			+ "AND (:minDiscount IS NULL OR v.discountPercent >= :minDiscount) "
			+ "ORDER BY "
			+ "CASE WHEN :sort = 'low_to_high' THEN v.discountedPrice END ASC, "
			+ "CASE WHEN :sort= 'high_to_low' THEN v.discountedPrice END DESC"
			)
	List<Vehicule> filterVehicules(@Param("category") String category,
			@Param("model") String model,
			@Param("transmission") String transmission, 
			@Param("engineType") String engineType,
			@Param("minPrice") Integer minPrice,
			@Param("maxPrice") Integer maxPrice,
			@Param("minDiscount") Integer minDiscount,
			@Param("sort") String sort
			);
	
}
