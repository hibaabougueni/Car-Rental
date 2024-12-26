package com.car.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.car.model.Cart;

public interface CartRepository extends JpaRepository<Cart,Integer>{

	@Query("SELECT c FROM Cart c WHERE c.user.id = :userId ")
	public Cart findByUserId(@Param("userId") Integer userId);

}
