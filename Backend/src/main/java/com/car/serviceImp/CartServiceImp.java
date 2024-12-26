package com.car.serviceImp;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.car.exception.ExceptionClass;
import com.car.exception.UserException;
import com.car.exception.VehiculeException;
import com.car.model.Cart;
import com.car.model.CartItem;
import com.car.model.UserEntity;
import com.car.model.Vehicule;
import com.car.repository.CartRepository;
import com.car.service.CartItemService;
import com.car.service.CartService;
import com.car.service.VehiculeService;

@Service
public class CartServiceImp implements CartService{
	
	private CartRepository cartRep;
	private CartItemService cartItemService;
	private VehiculeService vehiculeService;
	
	@Autowired
	public CartServiceImp(CartRepository cartRep, CartItemService cartItemService, VehiculeService vehiculeService) {
		this.cartRep = cartRep;
		this.cartItemService = cartItemService;
		this.vehiculeService = vehiculeService;
	}

	@Override
	public Cart createCart(UserEntity user) {
		Cart cart= new Cart();
		cart.setUser(user);
		return cartRep.save(cart);
	}

	@Override
	public String addCartItem(Integer userId, CartItem cartItem) throws ExceptionClass, UserException, VehiculeException {
		Cart cart = cartRep.findByUserId(userId);
		Vehicule v= vehiculeService.findVehiculeById(cartItem.getVehicule().getId());
		CartItem item= cartItemService.isCartItemExist(cart, v, userId);
		
		if(item==null) {
			CartItem newItem= new CartItem();
			newItem.setCart(cart);
			newItem.setVehicule(v);
			newItem.setUserId(userId);
			newItem.setPickupDate(cartItem.getPickupDate());
			newItem.setPickupPlace(cartItem.getPickupPlace());
			newItem.setReturnDate(cartItem.getReturnDate());
			newItem.setReturnPlace(cartItem.getReturnPlace());
			newItem.setDuration(newItem.calculateDuration());
			newItem.setItemPrice(v.getPrice()*newItem.getDuration());
			newItem.setItemDiscountedPrice(v.getDiscountedPrice()*newItem.getDuration());
			newItem.setBabySeat(cartItem.getBabySeat());
			
			
			System.out.println("time");
			System.out.println("Pickup Date: " + newItem.getPickupDate());
	        System.out.println("Pickup Place: " + newItem.getPickupPlace());
	        System.out.println("Return Date: " + newItem.getReturnDate());
	        System.out.println("Return Place: " + newItem.getReturnPlace());
			
			float totalPrice=cart.getTotalPrice();
			float totalDiscountedPrice=cart.getTotalDiscountedPrice();
			int totalItems=cart.getTotalItems();
			
			cart.setTotalItems(totalItems+1);
			cart.setTotalPrice(totalPrice + newItem.getItemPrice() + newItem.getBabySeat()*40* newItem.getDuration());
			cart.setTotalDiscountedPrice(totalDiscountedPrice+newItem.getItemDiscountedPrice() + newItem.getBabySeat()*40* newItem.getDuration());
			cart.setDiscount(cart.getTotalPrice() - cart.getTotalDiscountedPrice());
			cart.getCartItems().add(newItem);
			cartRep.save(cart);
			return "Item added to cart";
		}
		else {
			return "something went wrong";
		}
	
	}
	
	

	@Override
	public Cart findUserCart(Integer userId) throws UserException {
		Cart cart= cartRep.findByUserId(userId);
		
		float totalPrice=0;
		float totalDiscountedPrice=0;
		int totalItems=0;
		for(CartItem item: cart.getCartItems()) {
			totalPrice= totalPrice + item.getItemPrice();
			totalDiscountedPrice= totalDiscountedPrice + item.getItemDiscountedPrice();
			totalItems++;
		}
		cart.setTotalDiscountedPrice(totalDiscountedPrice);
		cart.setTotalPrice(totalPrice);
		cart.setTotalItems(totalItems);
		cart.setDiscount(totalPrice - totalDiscountedPrice);
		return cartRep.save(cart);
	}

//	@Override
//	public void cleanCart(Integer userId) throws UserException {
//		Cart cart=cartRep.findByUserId(userId);
//		cartRep.delet
//	}

}
