package com.car.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.car.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity,Integer>{
	@Query("SELECT u FROM UserEntity u JOIN FETCH u.roles WHERE u.email = :email")
	Optional<UserEntity> findByEmail(@Param("email") String email);
	Boolean existsByEmail(String email);
}
