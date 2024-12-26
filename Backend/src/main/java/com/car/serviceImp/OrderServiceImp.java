package com.car.serviceImp;
import java.util.UUID;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.car.exception.ExceptionClass;
import com.car.exception.UserException;
import com.car.exception.VehiculeException;
import com.car.model.Cart;
import com.car.model.CartItem;
import com.car.model.Customer;
import com.car.model.Order;
import com.car.model.OrderItem;
import com.car.model.UserEntity;
import com.car.model.Vehicule;
import com.car.repository.CustomerRepository;
import com.car.repository.OrderItemRepository;
import com.car.repository.OrderRepository;
import com.car.service.CartService;
import com.car.service.OrderItemService;
import com.car.service.OrderService;
import com.car.service.UserService;
import com.car.service.VehiculeService;

@Service
public class OrderServiceImp implements OrderService{

	private OrderRepository orderRep;
	private OrderItemService orderItemServ;
	private OrderItemRepository orderItemRep;
	private CartService cartServ;
	private UserService userServ;
	private CustomerRepository customerRep;
	private VehiculeService vehiculeServ;
	
	@Autowired
	public OrderServiceImp(OrderRepository orderRep, OrderItemService orderItemServ, OrderItemRepository orderItemRep,
			CartService cartServ, UserService userServ, CustomerRepository customerRep, VehiculeService vehiculeServ) {
		this.orderRep = orderRep;
		this.orderItemServ = orderItemServ;
		this.orderItemRep = orderItemRep;
		this.cartServ = cartServ;
		this.userServ = userServ;
		this.customerRep=customerRep;
		this.vehiculeServ=vehiculeServ;
	}

	@Override
	public Order createOrder(UserEntity user, Customer customer) throws UserException {
		
		customer.setUser(user);
		Customer cus= customerRep.save(customer);
		
		Cart cart= cartServ.findUserCart(user.getId());
		List<OrderItem> orderItems= new ArrayList<>();
		
		for(CartItem item: cart.getCartItems()) {
			OrderItem orderItem= new OrderItem();
			orderItem.setBabySeat(item.getBabySeat());
			orderItem.setPickupDate(item.getPickupDate());
			orderItem.setPickupPlace(item.getPickupPlace());
			orderItem.setReturnDate(item.getReturnDate());
			orderItem.setReturnPlace(item.getReturnPlace());
			orderItem.setUserId(item.getUserId());
			orderItem.setVehicule(item.getVehicule());
			
			orderItemServ.createOrderItem(orderItem);
			orderItems.add(orderItem);
		}
		
		Order createdOrder= new Order();
		createdOrder.setDiscount(cart.getDiscount());
		createdOrder.setOrderDate(LocalDateTime.now());
		createdOrder.setOrderId(UUID.randomUUID().toString());
		createdOrder.setCustomer(cus);
		createdOrder.setOrderItems(orderItems);
		createdOrder.setOrderStatus("PLACED");
		createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
		createdOrder.setTotalItems(cart.getTotalItems());
		createdOrder.setTotalPrice(cart.getTotalPrice());
		createdOrder.setUser(user);
		Order savedOrder= orderRep.save(createdOrder);
		
		for(OrderItem item:orderItems) {
			item.setOrder(savedOrder);
			orderItemServ.createOrderItem(item);
		}
		
		return savedOrder;
	}

	@Override
	public Order findOrderById(int id) throws ExceptionClass {
		Optional<Order> order= orderRep.findById(id);
		if(order.isPresent()) {
			return order.get();
		}
		else {
			throw new ExceptionClass("Order not found with this id.");
		}
	}

	@Override
	public Order cancelOrder(int id) throws ExceptionClass {
		Order o= findOrderById(id);
		o.setOrderStatus("CANCELED");
		return orderRep.save(o);
	}

	@Override
	public List<Order> userOrderHistory(int userId) throws UserException {
		List<Order> orders= orderRep.getUserOrders(userId);
		return orders;
	}

	@Override
	public void deleteOrder(int id) throws ExceptionClass {
		Order o= findOrderById(id);
		orderRep.delete(o);
		System.out.println("Order deleted successfully. ");
	}

	@Override
	public Order confirmOrder(int id) throws ExceptionClass {
		Order o= findOrderById(id);
		o.setOrderStatus("CONFIRMED");
		return orderRep.save(o);
	}

	@Override
	public List<Order> getAllOrders() {
		List<Order> orders= orderRep.findAll();
		return orders;
	}

	@Override
	public List<Order> findByvehicule(Long id) throws VehiculeException {
		List<Order> orders= getAllOrders();
		Vehicule v= vehiculeServ.findVehiculeById(id);
		List<Order> ordersVehi= new ArrayList<>();
		for(Order o: orders) {
			List<OrderItem> items =o.getOrderItems();
			for(OrderItem item :items) {
				if(item.getVehicule().equals(v)) {
					ordersVehi.add(o);
				}
			}
		}
		return ordersVehi;
		
		
	}


}
