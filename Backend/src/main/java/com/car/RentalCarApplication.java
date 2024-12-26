package com.car;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RentalCarApplication {

	public static void main(String[] args) {
		System.out.println();
		System.out.println("                                  -=-=-=-=-=-=-=-=-=-=-=-=-=- Application is Starting -=-=-=-=-=-=-=-=-=-=-=-=-=-");
		SpringApplication.run(RentalCarApplication.class, args);
		System.out.println();
		System.out.println("                                  -=-=-=-=-=-=-=-=-=-=-=-=-=- Application is Working Fine -=-=-=-=-=-=-=-=-=-=-=-=-=-");
	}

}
