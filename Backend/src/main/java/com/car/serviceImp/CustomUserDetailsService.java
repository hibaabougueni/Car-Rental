package com.car.serviceImp;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.car.model.Role;
import com.car.model.UserEntity;
import com.car.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService{

	private UserRepository userRep;
	
	
	public CustomUserDetailsService() {
		
	}
	@Autowired
	public CustomUserDetailsService(UserRepository userRep) {
		this.userRep=userRep;
	}
	
	@Override
    @Transactional
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		UserEntity user= userRep.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("email not found"));
		return new User(user.getEmail(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));
	}
	
	private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles){
		return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
	}

}
