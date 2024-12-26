package com.car.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
@Table(name = "users")
public class UserEntity {
	
	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Integer id; 

	  private String email; 

	  private String password;

	  private String firstName;

	  private String lastName;

	  private String phone;
	  
	  
	  @ManyToMany(cascade=CascadeType.ALL)
	  @JoinTable(
		        name = "user_roles",
		        joinColumns = @JoinColumn(name = "user_id"),
		        inverseJoinColumns = @JoinColumn(name = "role_id")
		    )
	  private List<Role> roles= new ArrayList<>();
	  
	public UserEntity() {
		
	}

	public UserEntity(Integer id, String email, String password, String firstName, String lastName, String phone) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
	
	
	  
	  
	  

}
