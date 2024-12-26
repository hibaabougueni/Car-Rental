package com.car.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Vehicule {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String brand;
	
	@ManyToOne
	private Category category;
	private String model;
	private int year;
	private String imageURL;
	private String color;
	private boolean availability;
	private String engineType;
	private String transmission;
	private float price;
	private int discountPercent;
	private float discountedPrice;
	private int seats;
	private int doors;
	private int trunkCapacity;
	private boolean ac;
	private boolean gps;
	
	public Vehicule() {
		
	}
	
	public Vehicule(Long id, String brand, Category category, String model, int year, String imageURL, String color,
			boolean availability, String engineType, String transmission, float price, int discountPercent,
			float discountedPrice, int seats, int doors, int trunkCapacity, boolean ac, boolean gps) {
		
		this.id = id;
		this.brand = brand;
		this.category = category;
		this.model = model;
		this.year = year;
		this.imageURL = imageURL;
		this.color = color;
		this.availability = availability;
		this.engineType = engineType;
		this.transmission = transmission;
		this.price = price;
		this.discountPercent = discountPercent;
		this.discountedPrice = discountedPrice;
		this.seats = seats;
		this.doors = doors;
		this.trunkCapacity = trunkCapacity;
		this.ac = ac;
		this.gps = gps;
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public boolean isAvailability() {
		return availability;
	}

	public void setAvailability(boolean availability) {
		this.availability = availability;
	}

	public String getEngineType() {
		return engineType;
	}

	public void setEngineType(String engineType) {
		this.engineType = engineType;
	}

	public String getTransmission() {
		return transmission;
	}

	public void setTransmission(String transmission) {
		this.transmission = transmission;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getDiscountPercent() {
		return discountPercent;
	}

	public void setDiscountPercent(int discountPercent) {
		this.discountPercent = discountPercent;
	}

	public float getDiscountedPrice() {
		return discountedPrice;
	}

	public void setDiscountedPrice(float discountedPrice) {
		this.discountedPrice = discountedPrice;
	}

	public int getSeats() {
		return seats;
	}

	public void setSeats(int seats) {
		this.seats = seats;
	}

	public int getDoors() {
		return doors;
	}

	public void setDoors(int doors) {
		this.doors = doors;
	}

	public int getTrunkCapacity() {
		return trunkCapacity;
	}

	public void setTrunkCapacity(int trunkCapacity) {
		this.trunkCapacity = trunkCapacity;
	}

	public boolean isAc() {
		return ac;
	}

	public void setAc(boolean ac) {
		this.ac = ac;
	}

	public boolean isGps() {
		return gps;
	}

	public void setGps(boolean gps) {
		this.gps = gps;
	}
	
	
	
	
	
	
	
	
	
	
	
}
