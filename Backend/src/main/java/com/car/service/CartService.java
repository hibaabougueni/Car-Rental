package com.car.service;

import com.car.exception.ExceptionClass;
import com.car.exception.UserException;
import com.car.exception.VehiculeException;
import com.car.model.Cart;
import com.car.model.CartItem;
import com.car.model.UserEntity;

public interface CartService {
	
	public Cart createCart(UserEntity user);
	public String addCartItem(Integer userId, CartItem cartItem) throws ExceptionClass, UserException, VehiculeException;
	public Cart findUserCart(Integer userId) throws UserException;
	//public void cleanCart(Integer userId) throws UserException;
}
