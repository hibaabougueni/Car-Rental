package com.car.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
public class Cart {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id", nullable=false)
    @JsonManagedReference
	private UserEntity user;
	
	@OneToMany(mappedBy="cart", cascade=CascadeType.ALL, orphanRemoval=true)
	private Set<CartItem> cartItems= new HashSet<>();
	
	private float totalPrice;
	private int totalItems;
	private float totalDiscountedPrice;
	private float discount;
	
	public Cart() {
		
	}
	
	public Cart(int id, UserEntity user, Set<CartItem> cartItems, float totalPrice, int totalItems,
			float totalDiscountedPrice, float discount) {
		this.id = id;
		this.user = user;
		this.cartItems = cartItems;
		this.totalPrice = totalPrice;
		this.totalItems = totalItems;
		this.totalDiscountedPrice = totalDiscountedPrice;
		this.discount = discount;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public Set<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(Set<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}

	public int getTotalItems() {
		return totalItems;
	}

	public void setTotalItems(int totalItems) {
		this.totalItems = totalItems;
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

	
	
}
