package com.app.Registration.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.Registration.model.Pincode;
import com.app.Registration.service.PincodeService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PincodeController {

	@Autowired
	private PincodeService pinservice;
	
	@GetMapping("/pincode")
	public List<Pincode> list(){
		return pinservice.listAll();
	}
	
	@GetMapping("/pincode/{pin}")
	public ResponseEntity<Pincode> get(@PathVariable int pin) {
		try {
		Pincode pincode = pinservice.fetchPincode(pin);
		return new ResponseEntity<Pincode>(pincode, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Pincode>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/pincode")
	public Pincode available(@RequestBody Pincode pincode) throws Exception {
		int temppin = pincode.getPin();
		Pincode pinObj = null;
		if(temppin > 100000 && temppin < 999999) {
			pinObj = pinservice.fetchPincode(temppin);
		}
		if(pinObj == null) {
			throw new Exception("Not Deliverable");
		}
		return pinObj;
	}
}
