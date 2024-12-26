package com.car.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.car.exception.ExceptionClass;
import com.car.exception.UserException;
import com.car.model.CartItem;
import com.car.model.UserEntity;
import com.car.service.CartItemService;
import com.car.service.CartService;
import com.car.service.UserService;

@RestController
@RequestMapping("/api/cartItem")
public class CartItemController {
	
	private CartItemService cartItemService;
	private UserService userService;
	private CartService cartService;
	
	@Autowired
	public CartItemController(CartItemService cartItemService, UserService userService) {
		this.cartItemService = cartItemService;
		this.userService = userService;
	}
	
	@PostMapping("/add")
	public ResponseEntity<CartItem> addCartItem(@RequestBody CartItem cartItem){
		CartItem item= cartItemService.createCartItem(cartItem);
		
		return new ResponseEntity<CartItem>(item, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteAll(@PathVariable int id) throws UserException{
		cartItemService.cleanCart(id);
		return new ResponseEntity<String>("Items removed from cart", HttpStatus.ACCEPTED);

	}
	
	
	@GetMapping("/id/{id}")
	public ResponseEntity<CartItem> getItemById(@PathVariable int id) throws ExceptionClass{
		CartItem item= cartItemService.findCartItemById(id);
		return new ResponseEntity<CartItem>(item, HttpStatus.OK);
	}
	
	//to be removed
		@PutMapping("/update/{id}/{iduser}")
		public ResponseEntity<CartItem> updateItem(@PathVariable int id, @RequestBody CartItem cartItem, @PathVariable Integer iduser) throws ExceptionClass, UserException{
			UserEntity user=userService.finduserById(iduser);
			CartItem item= cartItemService.updateCartItem(iduser, id, cartItem);
			return new ResponseEntity<CartItem>(item, HttpStatus.ACCEPTED);
		}
	
		@DeleteMapping("/delete/{iduser}/{id}")
		public ResponseEntity<String> deleteById(@PathVariable int id, @PathVariable Integer iduser) throws UserException, ExceptionClass{
			
			cartItemService.removeCartItem(iduser, id);
			return new ResponseEntity<String>("Item removed from cart", HttpStatus.ACCEPTED);

		}
		
		
	//working
	@DeleteMapping("/delete/id/{id}")
	public ResponseEntity<String> deleteById(@PathVariable int id, @RequestHeader("Authorization") String jwt) throws UserException, ExceptionClass{
		Optional<UserEntity> user= userService.findUserProfileByJwt(jwt);
		if(user.isPresent()) {
			UserEntity u= user.get();
			cartItemService.removeCartItem(u.getId(), id);
			return new ResponseEntity<String>("Item removed from cart", HttpStatus.ACCEPTED);

		}
		throw new UserException("We can't find this user");
	}
	
	
	//working
	@PutMapping("/update/id/{id}")
	public ResponseEntity<CartItem> updateCartItem(@PathVariable int id, @RequestHeader("Authorization") String jwt, @RequestBody CartItem cartItem) throws UserException, ExceptionClass{
		Optional<UserEntity> user= userService.findUserProfileByJwt(jwt);
		if(user.isPresent()) {
			UserEntity u= user.get();
			CartItem item= cartItemService.updateCartItem(u.getId(), id, cartItem);
			return new ResponseEntity<CartItem>(item, HttpStatus.ACCEPTED);

		}
		throw new UserException("We can't find this user");
	}
	
	
	
	

}
