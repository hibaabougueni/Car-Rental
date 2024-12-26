package com.car.service;

import java.time.LocalDateTime;
import java.util.List;

import com.car.exception.ExceptionClass;
import com.car.exception.UserException;
import com.car.exception.VehiculeException;
import com.car.model.Customer;
import com.car.model.Order;
import com.car.model.UserEntity;

public interface OrderService {
	
	//for user
	public Order createOrder(UserEntity user, Customer customer) throws UserException;
	public Order findOrderById(int id) throws ExceptionClass;
	public Order cancelOrder(int id) throws ExceptionClass;
	public List<Order> userOrderHistory(int userId) throws UserException;
	
	//for admin 
	public void deleteOrder(int id) throws ExceptionClass;
	public Order confirmOrder(int id) throws ExceptionClass;
	public List<Order> getAllOrders();
	public List<Order> findByvehicule(Long id) throws VehiculeException;
}
