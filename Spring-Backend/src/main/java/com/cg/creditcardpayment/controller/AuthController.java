package com.cg.creditcardpayment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.cg.creditcardpayment.request.*;
import com.cg.creditcardpayment.services.*;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class AuthController {

	@Autowired
	public AuthService authService;

	@PostMapping("/login")
	public String login(@RequestBody LoginRequest userdetails){
		Object obj = null;
		switch (userdetails.getRole()) {
		case "admin":
			obj = authService.loginAdmin(userdetails.getUsername(), userdetails.getPassword());
			break;
		case "customer":
			obj = authService.loginCustomer(userdetails.getUsername(), userdetails.getPassword());
			break;
		default:
			return "Wrong role entered!";
		}
		if (obj != null)
			return "Login successfull";
		else
			return "Id or password is incorrect";
	}
}