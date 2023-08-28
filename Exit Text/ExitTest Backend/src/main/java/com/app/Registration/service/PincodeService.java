package com.app.Registration.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Registration.model.Pincode;
import com.app.Registration.repository.PincodeRepository;

@Service
public class PincodeService {

	@Autowired
	private PincodeRepository pinrepo;
	
	public Pincode fetchPincode(int pin){
		return pinrepo.findByPin(pin);
	}
	
	public List<Pincode> listAll(){
		return pinrepo.findAll();
	}
}
