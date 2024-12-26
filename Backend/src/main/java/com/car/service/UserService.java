package com.car.service;

import java.util.List;
import java.util.Optional;

import com.car.exception.UserException;
import com.car.model.UserEntity;

public interface UserService {

	public UserEntity finduserById(Integer userId) throws UserException;
	public Optional<UserEntity> findUserProfileByJwt(String jwt) throws UserException;
	public List<UserEntity> getAll();
}
