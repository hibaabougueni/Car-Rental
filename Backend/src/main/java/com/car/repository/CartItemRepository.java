package com.car.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.car.model.Cart;
import com.car.model.CartItem;
import com.car.model.Vehicule;

public interface CartItemRepository extends JpaRepository<CartItem,Integer>{

	@Query("SELECT ci FROM CartItem ci WHERE ci.cart = :cart AND ci.vehicule= :vehicule AND ci.userId= :userId")
	public CartItem ItemExist(@Param("cart") Cart cart, @Param("vehicule") Vehicule vehicule, @Param("userId") Integer userId);
}
