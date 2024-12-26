package com.car.controller;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.car.repository.UserRepository;
import com.car.service.CartService;
import com.car.service.UserService;
import com.car.config.JWTGenerator;
import com.car.dto.AuthResponseDto;
import com.car.dto.LoginDto;
import com.car.exception.UserException;
import com.car.model.Cart;
import com.car.model.Role;
import com.car.model.UserEntity;
import com.car.repository.RoleRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private AuthenticationManager authenticationManager;
	private UserRepository userRep;
	private RoleRepository roleRep;
	private PasswordEncoder passwordencoder;
	private JWTGenerator jwtGenerator;
	private CartService cartService;
	
	
	@Autowired
	public AuthController(AuthenticationManager authenticationManager, UserRepository userRep, RoleRepository roleRep,
			PasswordEncoder passwordencoder, JWTGenerator jwtGenerator, CartService cartService) {
		
		this.authenticationManager = authenticationManager;
		this.userRep = userRep;
		this.roleRep = roleRep;
		this.passwordencoder = passwordencoder;
		this.jwtGenerator= jwtGenerator;
		this.cartService= cartService;
	}
	
    @PostMapping(value = "login", consumes = "application/json", produces = "application/json")
	public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto user) throws UserException {
		Authentication auth=authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
		);
		SecurityContextHolder.getContext().setAuthentication(auth);
		String token= jwtGenerator.generateToken(auth);
		
		
		return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
	    
	}
	
	@PostMapping("register")
	public ResponseEntity<String> register(@RequestBody UserEntity user){
		if(userRep.existsByEmail(user.getEmail())) {
			return new ResponseEntity<>("Email already taken", HttpStatus.BAD_REQUEST);
		}
		UserEntity newUser= new UserEntity();
		newUser.setEmail(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setPassword(passwordencoder.encode((user.getPassword())));
		newUser.setPhone(user.getPhone());
		
		
		Role roles = roleRep.findByName("USER").orElseGet(() -> {
	        Role newRole = new Role();
	        newRole.setName("USER");
	        return roleRep.save(newRole);
	    });
	    newUser.setRoles(Collections.singletonList(roles));
	    
		UserEntity savedUser= userRep.save(newUser);
		cartService.createCart(savedUser);
		return new ResponseEntity<>("User succesfully registred", HttpStatus.OK);
	}
	
	

}
