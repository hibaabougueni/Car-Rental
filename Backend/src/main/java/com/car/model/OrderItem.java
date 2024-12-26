package com.car.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JsonBackReference
	private Order order;
	
	@ManyToOne
	private Vehicule vehicule;
	
	private int babySeat;
	private Integer userId;
	private LocalDateTime pickupDate;
	private String pickupPlace;
	private LocalDateTime returnDate;
	private String returnPlace;
	
	public OrderItem() {
		
	}
	
	
	
	public OrderItem(int id, Order order, Vehicule vehicule, int babySeat, Integer userId, LocalDateTime pickupDate,
			String pickupPlace, LocalDateTime returnDate, String returnPlace) {
		super();
		this.id = id;
		this.order = order;
		this.vehicule = vehicule;
		this.babySeat = babySeat;
		this.userId = userId;
		this.pickupDate = pickupDate;
		this.pickupPlace = pickupPlace;
		this.returnDate = returnDate;
		this.returnPlace = returnPlace;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
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
	public LocalDateTime getReturnDate() {
		return returnDate;
	}
	public void setReturnDate(LocalDateTime returnDate) {
		this.returnDate = returnDate;
	}



	public String getPickupPlace() {
		return pickupPlace;
	}



	public void setPickupPlace(String pickupPlace) {
		this.pickupPlace = pickupPlace;
	}



	public String getReturnPlace() {
		return returnPlace;
	}



	public void setReturnPlace(String returnPlace) {
		this.returnPlace = returnPlace;
	}
	
	
	
}
