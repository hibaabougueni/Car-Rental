//package com.car.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.car.exception.ExceptionClass;
//import com.car.model.OrderItem;
//import com.car.service.OrderItemService;
//
//@RestController
//@RequestMapping("/api/orderItem")
//public class OrderItemController {
//
//	private OrderItemService orderItemServ;
//	 
//
//	@Autowired
//	public OrderItemController(OrderItemService orderItemServ) {
//		this.orderItemServ = orderItemServ;
//	}
//	
//	@GetMapping("/order/{id}")
//	public ResponseEntity<List<OrderItem>> getItemsInOrder(@PathVariable int id) throws ExceptionClass{
//		List<OrderItem> items= orderItemServ.getItemByOrder(id);
//		return new ResponseEntity<List<OrderItem>>(items,HttpStatus.ACCEPTED);
//	}
//	
//	@GetMapping("/id/{id}")
//	public ResponseEntity<OrderItem> getItem(@PathVariable int id) throws ExceptionClass{
//		OrderItem item=orderItemServ.getItemById(id);
//		return new ResponseEntity<OrderItem>(item, HttpStatus.ACCEPTED);
//	}
//	
//	
//}
