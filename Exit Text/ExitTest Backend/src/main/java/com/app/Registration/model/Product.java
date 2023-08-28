package com.app.Registration.model;

import javax.persistence.*;
@Entity
@Table(name = "product")
public class Product {
	
	@Column(name = "id")
	private Integer id;
	@Column(name = "pcode")
	private int pcode;
	@Column(name = "pname")
	private String pname;
	@Column(name = "pdescription")
	private String pdescription;
	@Column(name = "pprice")
	private int pprice;
	@Column(name = "pimage", length = 1000)
	private String pimage;
	@Column(name = "pbrand")
	private String pbrand;
	@Column(name = "category")
	private String category;
	
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Product(Integer id, int pcode, String pname, String pdescription, int pprice, String pimage, String pbrand, String category) {
		super();
		this.id = id;
		this.pcode = pcode;
		this.pname = pname;
		this.pdescription = pdescription;
		this.pprice = pprice;
		this.pimage = pimage;
		this.pbrand = pbrand;
		this.category = category;
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public int getPcode() {
		return pcode;
	}
	public void setPcode(int pcode) {
		this.pcode = pcode;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public String getPdescription() {
		return pdescription;
	}
	public void setPdescription(String pdescription) {
		this.pdescription = pdescription;
	}
	public int getPprice() {
		return pprice;
	}
	public void setPprice(int pprice) {
		this.pprice = pprice;
	}
	public String getPimage() {
		return pimage;
	}
	public void setPimage(String pimage) {
		this.pimage = pimage;
	}
	public String getPbrand() {
		return pbrand;
	}
	public void setPbrand(String pbrand) {
		this.pbrand = pbrand;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}

	
}