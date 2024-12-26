package com.car.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.car.exception.ExceptionClass;
import com.car.exception.UserException;
import com.car.exception.VehiculeException;
import com.car.model.Customer;
import com.car.model.Order;
import com.car.model.UserEntity;
import com.car.service.OrderService;
import com.car.service.UserService;

@RestController
@RequestMapping("/api/order")
public class OrderController {
	
	private OrderService orderServ;
	private UserService userServ;
	
	@Autowired
	public OrderController(OrderService orderServ, UserService userServ) {
		this.orderServ = orderServ;
		this.userServ = userServ;
	}
	
	@GetMapping("/all/vehicule/{id}")
	public ResponseEntity<List<Order>> ordersByVehicule(@PathVariable Long id) throws VehiculeException{
		List<Order> o= orderServ.findByvehicule(id);
		return new ResponseEntity<List<Order>>(o, HttpStatus.OK);
	}
	
	
	@PostMapping("/add/id/{id}")
	public ResponseEntity<Order> addOrder(@PathVariable Integer id, @RequestBody Customer customer ) throws UserException{
		UserEntity user= userServ.finduserById(id);
		Order o= orderServ.createOrder(user, customer);
		return new ResponseEntity<Order>(o, HttpStatus.OK);
		
	}
	
	@PostMapping("/add")
	public ResponseEntity<Order> createOrder(@RequestHeader("Authorization") String jwt, @RequestBody Customer customer ) throws UserException{
		Optional<UserEntity> user= userServ.findUserProfileByJwt(jwt);
		if(user.isPresent()) {
			UserEntity u= user.get();
			Order o= orderServ.createOrder(u, customer);
			return new ResponseEntity<Order>(o, HttpStatus.OK);
		}
		else {
			throw new UserException("User not found");
		}
	}
	
	@GetMapping("/userHistory/id/{id}")
	public ResponseEntity<List<Order>> getUserHistoryOrder(@PathVariable Integer id) throws UserException{

		List<Order> orders= orderServ.userOrderHistory(id);
		return new ResponseEntity<List<Order>>(orders, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/userHistory")
	public ResponseEntity<List<Order>> getUserHistoryOrder(@RequestHeader("Authorization") String jwt) throws UserException{
		Optional<UserEntity> user = userServ.findUserProfileByJwt(jwt);
		if(user.isPresent()) {
			UserEntity u= user.get();
			List<Order> orders= orderServ.userOrderHistory(u.getId());
			return new ResponseEntity<List<Order>>(orders, HttpStatus.ACCEPTED);
		}
		else {
			throw new UserException("User not found");	
		}
	}
	
//	@GetMapping("/{id}")
//	public ResponseEntity<Order> findOrderById(@RequestHeader("Authorization") String jwt, @PathVariable int id) throws ExceptionClass{
//		Order o=orderServ.findOrderById(id);
//		return new ResponseEntity<Order>(o,HttpStatus.ACCEPTED);
//	}
	@GetMapping("/{id}")
	public ResponseEntity<Order> findOrderById(@PathVariable int id) throws ExceptionClass{
		Order o=orderServ.findOrderById(id);
		return new ResponseEntity<Order>(o,HttpStatus.ACCEPTED);
	}
	
	//FOR ADMIN
	
	@GetMapping("/admin/all")
	public ResponseEntity<List<Order>> getAllOrders(){
		List<Order> orders= orderServ.getAllOrders();
		return new ResponseEntity<List<Order>>(orders, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/admin/confirm/{id}")
	public ResponseEntity<Order> confirmOrder(@PathVariable int id) throws ExceptionClass{
		Order confirmedOrder= orderServ.confirmOrder(id);
		return new ResponseEntity<Order>(confirmedOrder, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/admin/cancel/{id}")
	public ResponseEntity<Order> cancelOrder(@PathVariable int id) throws ExceptionClass{
		Order canceledOrder= orderServ.cancelOrder(id);
		return new ResponseEntity<Order>(canceledOrder, HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/admin/delete/{id}")
	public ResponseEntity<String> deleteOrder(@PathVariable int id) throws ExceptionClass{
		orderServ.deleteOrder(id);
		return new ResponseEntity<String>("Order Deleted", HttpStatus.ACCEPTED);
	}
	
	
}
