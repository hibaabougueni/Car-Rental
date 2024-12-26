package com.car.service;

import com.car.exception.ExceptionClass;
import com.car.exception.UserException;
import com.car.model.Cart;
import com.car.model.CartItem;
import com.car.model.Vehicule;

public interface CartItemService {

	public CartItem createCartItem(CartItem cartItem);
	public CartItem updateCartItem(Integer userId, int id, CartItem cartItem) throws ExceptionClass, UserException;
	public CartItem isCartItemExist(Cart cart, Vehicule vehicule, Integer userId);
	public void removeCartItem(Integer userId, int id) throws ExceptionClass, UserException;
	public void cleanCart(Integer userId) throws UserException;
	public CartItem findCartItemById(int id) throws ExceptionClass;
}
