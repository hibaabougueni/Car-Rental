package com.car.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CartItem {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JsonIgnore
	private Cart cart;
	
	@ManyToOne
	private Vehicule vehicule;
	
	private int babySeat;
	private float itemPrice;
	private float itemDiscountedPrice;
	private Integer userId;
	private LocalDateTime pickupDate;
	private String pickupPlace;
	private LocalDateTime returnDate;
	private String returnPlace;
	private int duration;

	public CartItem() {
		
	}


	public CartItem(int id, Cart cart, Vehicule vehicule, int babySeat, float itemPrice, float itemDiscountedPrice,
			Integer userId, LocalDateTime pickupDate, String pickupPlace, LocalDateTime returnDate,
			String returnPlace, int duration) {
		this.id = id;
		this.cart = cart;
		this.vehicule = vehicule;
		this.babySeat = babySeat;
		this.itemPrice = itemPrice;
		this.itemDiscountedPrice = itemDiscountedPrice;
		this.userId = userId;
		this.pickupDate = pickupDate;
		this.pickupPlace = pickupPlace;
		this.returnDate = returnDate;
		this.returnPlace = returnPlace;
		this.duration=calculateDuration();
	}

	public int calculateDuration() {
	    return (int) java.time.Duration.between(pickupDate, returnDate).toDays();
	}
	

	public int getDuration() {
		return duration;
	}


	public void setDuration(int duration) {
		this.duration = duration;
	}


	public float getItemPrice() {
		return itemPrice;
	}




	public void setItemPrice(float itemPrice) {
		this.itemPrice = itemPrice;
	}




	public float getItemDiscountedPrice() {
		return itemDiscountedPrice;
	}




	public void setItemDiscountedPrice(float itemDiscountedPrice) {
		this.itemDiscountedPrice = itemDiscountedPrice;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public Vehicule getVehicule() {
		return vehicule;
	}

	public void setVehicule(Vehicule vehicule) {
		this.vehicule = vehicule;
	}

	public int getBabySeat() {
		return babySeat;
	}

	public void setBabySeat(int babySeat) {
		this.babySeat = babySeat;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public LocalDateTime getPickupDate() {
		return pickupDate;
	}

	public void setPickupDate(LocalDateTime pickupDate) {
		this.pickupDate = pickupDate;
	}

	public String getPickupPlace() {
		return pickupPlace;
	}

	public void setPickupPlace(String pickupPlace) {
		this.pickupPlace = pickupPlace;
	}

	public LocalDateTime getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(LocalDateTime returnDate) {
		this.returnDate = returnDate;
	}

	public String getReturnPlace() {
		return returnPlace;
	}

	public void setReturnPlace(String returnPlace) {
		this.returnPlace = returnPlace;
	}
	
	
}
