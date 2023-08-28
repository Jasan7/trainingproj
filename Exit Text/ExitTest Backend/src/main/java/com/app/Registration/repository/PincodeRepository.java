package com.app.Registration.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Registration.model.Pincode;

public interface PincodeRepository extends JpaRepository<Pincode, Integer>{

	public Pincode findByPin(int pin);

}
