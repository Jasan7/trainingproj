package AdvJava.Advjv1;


public class Tshirt {
	private String Id;
	private String name;
	private String color;
	private String gender;
	private String size;
	private float price;
	private float rating;
	private String Available;
	public Tshirt(String id, String name, String color, String gender, String size, float price, float rating,
			String available) {
		this.Id = id;
		this.name = name;
		this.color = color;
		this.gender = gender;
		this.size = size;
		this.price = price;
		this.rating = rating;
		this.Available = available;
	}
	
	public String getId() {
		return Id;
	}
	public void setId(String id) {
		this.Id = id;
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
		return Available;
	}
	public void setAvailable(String available) {
		this.Available = available;
	}
	
}
