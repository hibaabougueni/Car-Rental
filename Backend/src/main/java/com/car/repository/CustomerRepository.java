package com.car.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.car.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer,Integer>{

}
