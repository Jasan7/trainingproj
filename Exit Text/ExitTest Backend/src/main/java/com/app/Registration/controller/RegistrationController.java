package com.app.Registration.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.Registration.model.User;
import com.app.Registration.service.RegistrationService;

@RestController
public class RegistrationController {
	
	@Autowired
	private RegistrationService service;
	
	@PostMapping("/registerUser")
	@CrossOrigin(origins = "http://localhost:4200")

	public User registerUser(@RequestBody User user) throws Exception{
		String tempEmail = user.getEmail();
		if(tempEmail != null && !"".equals(tempEmail)) {
			User userObj = service.fetchUserByEmail(tempEmail);
		    if(userObj != null) {
		    	throw new Exception("Email address " + tempEmail + " already exists");
		    }
		}
		User userObj = null;	
		userObj = service.saveUser(user);
		return userObj;
	}
	
	@PostMapping("/login")
	@CrossOrigin(origins = "http://localhost:4200")
	public User loginUser(@RequestBody User user) throws Exception {
		String tempEmail = user.getEmail();
		String tempPass = user.getPassword();
		User userObj = null;
		if(tempEmail != null && tempPass != null) {
			userObj = service.fetchUserByEmailAndPass(tempEmail, tempPass);			
		}
		if(userObj == null) {
			throw new Exception("Bad Credentials");
		}
		return userObj;
	}
	

	@DeleteMapping("/registerUser/{id}")
	public void delete(@PathVariable Integer id) {
		service.delete(id);
	}
}
