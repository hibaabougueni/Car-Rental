package com.car.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.car.serviceImp.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	private JwtAuthEntryPoint authentryPoint;
	
	private CustomUserDetailsService userDetailsService;
	
	 
	 private JWTGenerator jwtGenerator;
	
	@Autowired
	public SecurityConfig(CustomUserDetailsService userDetailsService, JwtAuthEntryPoint authentryPoint, JWTGenerator jwtGenerator) {
		this.userDetailsService = userDetailsService;
		this.authentryPoint=authentryPoint;
		this.jwtGenerator = jwtGenerator;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http
			.csrf().disable()
			.exceptionHandling()
			.authenticationEntryPoint(authentryPoint)
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeRequests()
			.requestMatchers("/api/**").permitAll()
			.anyRequest().authenticated()
			.and()
			.httpBasic();
		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
	
//	@Bean
//	public UserDetailsService users() {
//		UserDetails admin=User.builder()
//				.username("admin")
//				.password("password")
//				.roles("ADMIN")
//				.build();
//		UserDetails user=User.builder()
//				.username("user")
//				.password("password")
//				.roles("USER")
//				.build();
//		return new InMemoryUserDetailsManager(admin,user);
//	}
//	
	@Bean
	public AuthenticationManager autheticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
	
	//password Encoder
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean 
	public JWTAuthenticationFilter jwtAuthenticationFilter() {
		return new JWTAuthenticationFilter();
	}
}
