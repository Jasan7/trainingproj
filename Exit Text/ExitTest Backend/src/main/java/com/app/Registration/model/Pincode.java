package com.app.Registration.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "pincode")
public class Pincode {
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "pin")
	private int pin;
	
	@Column(name = "ship")
	private String ship;
	

	public String getShip() {
		return ship;
	}

	public void setShip(String ship) {
		this.ship = ship;
	}

	public Pincode() {
		
	}

	public Pincode(Integer id, int pin, String ship) {
		super();
		this.id = id;
		this.pin = pin;
		this.ship = ship;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getPin() {
		return pin;
	}

	public void setPin(int pin) {
		this.pin = pin;
	}

}
