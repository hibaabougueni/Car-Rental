package com.car.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.car.exception.UserException;
import com.car.model.UserEntity;
import com.car.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/profile")
	public ResponseEntity<UserEntity> getUserProfile(@RequestHeader("Authorization") String jwt) throws UserException{
		System.out.println("Received JWT: " + jwt);
		Optional<UserEntity> userOptional= userService.findUserProfileByJwt(jwt);
		if(userOptional.isPresent()) {
			UserEntity user = userOptional.get();
	        return new ResponseEntity<UserEntity>(user, HttpStatus.OK); 
	    } else {
	        return new ResponseEntity<UserEntity>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<UserEntity>> getAllUsers() {
		List<UserEntity> users= userService.getAll();
		return new ResponseEntity<List<UserEntity>>(users, HttpStatus.OK);
	}
	
}
