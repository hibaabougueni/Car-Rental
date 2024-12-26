package com.car.serviceImp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.car.config.JWTGenerator;
import com.car.exception.UserException;
import com.car.model.UserEntity;
import com.car.repository.UserRepository;
import com.car.service.UserService;

@Service
public class UserServiceImp implements UserService{

	private UserRepository userRep;
	
	private JWTGenerator jwtGenerator;

	@Autowired
	public UserServiceImp(UserRepository userRep, JWTGenerator jwtGenerator) {
		this.userRep = userRep;
		this.jwtGenerator = jwtGenerator;
	}

	@Override
	public UserEntity finduserById(Integer userId) throws UserException {
		Optional<UserEntity> u=userRep.findById(userId);
		if(u.isPresent()) {
			return u.get();
		} 
		throw new UserException("User not found with id "+userId);
	}

	@Override
	public Optional<UserEntity> findUserProfileByJwt(String jwt) throws UserException {
		String email= jwtGenerator.getEmailFromJWT(jwt);
		Optional<UserEntity> user=userRep.findByEmail(email);
		if(user.isPresent()) {
			System.out.println("Email user : "+ email);
			return user;
		}
		throw new UserException("User not found with email "+ email);
	}

	@Override
	public List<UserEntity> getAll(){
		return userRep.findAll();
	}

}
