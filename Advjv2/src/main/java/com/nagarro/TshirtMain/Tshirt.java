package com.nagarro.TshirtMain;

import javax.persistence.*;
import javax.persistence.Id;

@Entity
public class Tshirt {

	@Id
	private int count;
	private String Id;
	private String name;
	@Column(name = "Color")
	private String color;
	private String gender;
	private String size;
	private float price;
	private float rating;
	private String availability;

	public String getId() {
		return Id;
	}

	public void setProductId(String Id) {
		this.Id = Id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public String getAvailable() {
		return availability;
	}

	public void setAvailability(String availability) {
		this.availability = availability;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

//	@Override
//	public String toString() {
//		
//		return "Id = " + Id + ", Name = " + name + ", Color = " + color + ", Gender = " + gender
//				+ ", Size = " + size + ", Price = " + price + ", Rating = " + rating + ", Availability = " + availability + "";
//	}

}