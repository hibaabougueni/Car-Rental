package com.car.service;

import java.util.List;

import com.car.exception.ExceptionClass;
import com.car.model.OrderItem;

public interface OrderItemService {
	
	public OrderItem createOrderItem(OrderItem item);
//	public List<OrderItem> getItemByOrder(int orderId) throws ExceptionClass;
//	public OrderItem getItemById(int id) throws ExceptionClass;
}
