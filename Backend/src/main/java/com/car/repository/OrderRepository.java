package com.car.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.car.model.Order;

public interface OrderRepository extends JpaRepository<Order,Integer> {

	@Query("SELECT o FROM Order o WHERE o.user.id = :userId") //AND o.orderStatus = 'CONFIRMED' OR o.orderStatus= 'PLACED'
	public List<Order> getUserOrders(@Param("userId") int userId);
	
}
