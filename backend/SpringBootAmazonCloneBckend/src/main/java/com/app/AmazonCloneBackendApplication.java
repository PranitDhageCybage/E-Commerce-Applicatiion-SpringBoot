package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class }) //Excluding In built Spring Security  : Using generated security password
public class AmazonCloneBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AmazonCloneBackendApplication.class, args);
	}

}
