package com.car.serviceImp;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.car.exception.ExceptionClass;
import com.car.exception.UserException;
import com.car.model.Cart;
import com.car.model.CartItem;
import com.car.model.UserEntity;
import com.car.model.Vehicule;
import com.car.repository.CartItemRepository;
import com.car.repository.VehiculeRepository;
import com.car.service.CartItemService;
import com.car.service.UserService;

@Service
public class CartItemServiceImp implements CartItemService{

	public CartItemRepository cartItemRep;
	public UserService userService;
	public VehiculeRepository vehiculeRep;
	
	@Autowired
	public CartItemServiceImp(CartItemRepository cartItemRep, UserService userService, VehiculeRepository vehiculeRep) {
		this.cartItemRep = cartItemRep;
		this.userService = userService;
		this.vehiculeRep=vehiculeRep;
	}

	@Override
	public CartItem createCartItem(CartItem cartItem) {
		
		Vehicule vehicule = vehiculeRep.findById(cartItem.getVehicule().getId())
	                .orElseThrow(() -> new IllegalArgumentException("Invalid vehicule ID"));
	    
		cartItem.setVehicule(vehicule);
		cartItem.setItemPrice(cartItem.getVehicule().getPrice() + cartItem.getBabySeat()*40);
		cartItem.setItemDiscountedPrice(cartItem.getVehicule().getDiscountedPrice() + cartItem.getBabySeat()*40);
		CartItem newItem= cartItemRep.save(cartItem);
		return newItem;
	}

	@Override
	public CartItem updateCartItem(Integer userId, int id, CartItem cartItem) throws ExceptionClass, UserException {
		CartItem item= findCartItemById(id);
		UserEntity user=userService.finduserById(item.getUserId());
		if(user.getId().equals(userId)) {
			Vehicule vehicule = vehiculeRep.findById(cartItem.getVehicule().getId())
	                .orElseThrow(() -> new IllegalArgumentException("Invalid vehicule ID"));
			cartItem.setVehicule(vehicule);
			item.setBabySeat(cartItem.getBabySeat());
//			item.setItemPrice(cartItem.getVehicule().getPrice() + cartItem.getBabySeat()*40);
//			item.setItemDiscountedPrice(cartItem.getVehicule().getDiscountedPrice() + cartItem.getBabySeat()*40);
			item.setPickupDate(cartItem.getPickupDate());
			item.setReturnDate(cartItem.getReturnDate());
			item.setPickupPlace(cartItem.getPickupPlace());
			item.setReturnPlace(cartItem.getReturnPlace());
			
			int duration =cartItem.calculateDuration();
	        item.setDuration(duration);
	        item.setItemPrice((vehicule.getPrice() + cartItem.getBabySeat() * 40) * duration);
	        item.setItemDiscountedPrice((vehicule.getDiscountedPrice() + cartItem.getBabySeat() * 40) * duration);
	        
			return cartItemRep.save(item);
		}
		else {
			throw new UserException("You cannot update someone else cart");
		}
	}

	@Override
	public CartItem isCartItemExist(Cart cart, Vehicule vehicule, Integer userId) {
		CartItem item = cartItemRep.ItemExist(cart, vehicule, userId);
		return item;
	}

	@Override
	public void removeCartItem(Integer userId, int id) throws ExceptionClass, UserException {
		CartItem item= findCartItemById(id);
		UserEntity user= userService.finduserById(item.getUserId());
		if(user.getId().equals(userId)) {
			cartItemRep.delete(item);
			System.out.println("Item deleted successfully ");
		}
		else {
			throw new UserException("You can't delete someone else cart item. ");
		}
		
		
	}

	@Override
	public CartItem findCartItemById(int id) throws ExceptionClass {
		Optional<CartItem> item= cartItemRep.findById(id);
		if(item.isPresent()) {
			return item.get();
		}
		else {
			throw new ExceptionClass("No cartItem found with this id");	
		}
	}

	@Override
	public void cleanCart(Integer userId) throws UserException {
		UserEntity user= userService.finduserById(userId);
		if(user.getId().equals(userId)) {
			cartItemRep.deleteAll();
			System.out.println("Items deleted successfully ");
		}
		else {
			throw new UserException("You can't delete someone else cart items. ");
		}
		
	}

}
