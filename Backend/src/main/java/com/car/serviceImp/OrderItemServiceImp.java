package com.car.serviceImp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.car.exception.ExceptionClass;
import com.car.model.Order;
import com.car.model.OrderItem;
import com.car.repository.OrderItemRepository;
import com.car.service.OrderItemService;
import com.car.service.OrderService;

@Service
public class OrderItemServiceImp implements OrderItemService{

	private OrderItemRepository orderItemRep;
	
	
	@Autowired
	public OrderItemServiceImp(OrderItemRepository orderItemRep) {
		this.orderItemRep = orderItemRep;
		
	}

	@Override
	public OrderItem createOrderItem(OrderItem item) {
		return orderItemRep.save(item);
	}

//	@Override
//	public List<OrderItem> getItemByOrder(int orderId) throws ExceptionClass {
//		Order o=orderServ.findOrderById(orderId);
//		return orderItemRep.findAllByOrder(o);
//	}
//
//	@Override
//	public OrderItem getItemById(int id) throws ExceptionClass {
//		Optional<OrderItem> item=orderItemRep.findById(id);
//		if(item.isPresent()) {
//			OrderItem oi=item.get();
//			return oi;
//		}else {
//			throw new ExceptionClass("Order not found with this id.");
//		}
//	}

}
