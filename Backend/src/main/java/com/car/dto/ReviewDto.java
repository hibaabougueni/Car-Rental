package com.car.dto;


public class ReviewDto {

	private Long vehiculeId;
	private String review;
	private double rating;
	
	public ReviewDto() {
		
	}

	public ReviewDto(Long vehiculeId, String review, double rating) {
		this.vehiculeId = vehiculeId;
		this.review = review;
		this.rating=rating;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public Long getVehiculeId() {
		return vehiculeId;
	}

	public void setVehiculeId(Long vehiculeId) {
		this.vehiculeId = vehiculeId;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}
	
}
