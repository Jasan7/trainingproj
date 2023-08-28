package com.app.Registration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Registration.model.User;
import com.app.Registration.repository.RegistrationRepository;

@Service
public class RegistrationService {
	
	@Autowired
	private RegistrationRepository repo;
	
	public User saveUser(User user) {
		
		return repo.save(user);
		
	}
	
	public User fetchUserByEmail(String email) {
		
		return repo.findByEmail(email);
	}
	
    public User fetchUserByEmailAndPass(String email, String password) {
		
		return repo.findByEmailAndPassword(email, password);
	}
	
	public void delete(Integer id) {
		repo.deleteById(id);
	}

}
