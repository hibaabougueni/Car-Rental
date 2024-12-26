package com.car.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.car.model.Order;
import com.car.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem,Integer> {
	//List<OrderItem> findAllByOrder(Order o);
}
