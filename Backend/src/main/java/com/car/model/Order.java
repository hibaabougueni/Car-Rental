package com.car.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String orderId;
	
	@ManyToOne
	private UserEntity user;
	
	@OneToMany(mappedBy="order", cascade=CascadeType.ALL, orphanRemoval=true)
	@JsonManagedReference
	private List<OrderItem> orderItems=new ArrayList<>();
	
	private LocalDateTime orderDate;
	private float totalPrice;
	private float totalDiscountedPrice;
	private float discount;
	private String orderStatus;
	private int totalItems;

	@OneToOne
	private Customer customer;
	
	public Order() {
		
	}
	

	public Order(int id, String orderId, UserEntity user, List<OrderItem> orderItems, LocalDateTime orderDate,
			float totalPrice, float totalDiscountedPrice, float discount, String orderStatus, int totalItems,
			Customer customer) {
		this.id = id;
		this.orderId = orderId;
		this.user = user;
		this.orderItems = orderItems;
		this.orderDate = orderDate;
		this.totalPrice = totalPrice;
		this.totalDiscountedPrice = totalDiscountedPrice;
		this.discount = discount;
		this.orderStatus = orderStatus;
		this.totalItems = totalItems;
		this.customer = customer;
	}


	public Customer getCustomer() {
		return customer;
	}

	
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public List<OrderItem> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}

	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}

	public float getTotalDiscountedPrice() {
		return totalDiscountedPrice;
	}

	public void setTotalDiscountedPrice(float totalDiscountedPrice) {
		this.totalDiscountedPrice = totalDiscountedPrice;
	}

	public float getDiscount() {
		return discount;
	}

	public void setDiscount(float discount) {
		this.discount = discount;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public int getTotalItems() {
		return totalItems;
	}

	public void setTotalItems(int totalItems) {
		this.totalItems = totalItems;
	}
	
	
	
	
}
