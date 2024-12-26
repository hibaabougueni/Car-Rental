package com.car.dto;

public class RatingDto {
	
	private Long vehiculeId;
	
	private double rating;
	
	public RatingDto() {
		
	}
	
	public RatingDto(Long vehiculeId, double rating) {
		this.vehiculeId = vehiculeId;
		this.rating = rating;
	}

	public Long getVehiculeId() {
		return vehiculeId;
	}
	
	public void setVehiculeId(Long vehiculeId) {
		this.vehiculeId = vehiculeId;
	}
	
	public double getRating() {
		return rating;
	}
	
	public void setRating(double rating) {
		this.rating = rating;
	}
	
}
