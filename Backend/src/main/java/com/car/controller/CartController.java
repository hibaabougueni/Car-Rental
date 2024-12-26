package com.car.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.car.exception.ExceptionClass;
import com.car.exception.UserException;
import com.car.exception.VehiculeException;
import com.car.model.Cart;
import com.car.model.CartItem;
import com.car.model.UserEntity;
import com.car.service.CartService;
import com.car.service.UserService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
	
	private CartService cartService;
	private UserService userService;
	
	@Autowired
	public CartController(CartService cartService, UserService userService) {
		this.cartService = cartService;
		this.userService = userService;
	}
	
	//to be removed
	@GetMapping("/id/{id}")
	public ResponseEntity<Cart> findCart(@PathVariable Integer id) throws UserException{
		UserEntity user= userService.finduserById(id);
		Cart cart= cartService.findUserCart(id);
		return new ResponseEntity<Cart>(cart, HttpStatus.OK);
	}
	
	
	// is working
	@GetMapping("/")
	public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException{
		
		if (jwt == null || jwt.isEmpty()) {
	        throw new UserException("Token is missing");
	    }
		Optional<UserEntity> user= userService.findUserProfileByJwt(jwt);
		if(user.isPresent()) {
			UserEntity u= user.get();
			Cart cart= cartService.findUserCart(u.getId());
			return new ResponseEntity<Cart>(cart, HttpStatus.OK);
		}
		else {
			throw new UserException("user not found");
		}
	}
	
	// to be removed
	@PutMapping("/add/id/{id}")
	public ResponseEntity<String> addItemToCart2(@RequestBody CartItem item, @PathVariable Integer id ) throws ExceptionClass, UserException, VehiculeException{
		UserEntity user= userService.finduserById(id);
		cartService.addCartItem(id, item);
		return new ResponseEntity<String>("Item added successfully to cart. ", HttpStatus.ACCEPTED);	
	}
	
	//is working
	@PutMapping("/addItem")
	public ResponseEntity<String> addItemToCart(@RequestBody CartItem item, @RequestHeader("Authorization") String jwt) throws UserException, ExceptionClass, VehiculeException{
		Optional<UserEntity> user= userService.findUserProfileByJwt(jwt);
		if(user.isPresent()) {
			UserEntity u= user.get();
			cartService.addCartItem(u.getId(), item);
			return new ResponseEntity<String>("Item added successfully to cart. ", HttpStatus.ACCEPTED);
		}
		else {
			throw new UserException("User not found ");
		}
	}
	
}
