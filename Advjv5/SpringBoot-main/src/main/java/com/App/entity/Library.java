package com.App.entity;

import javax.persistence.Column;
//import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
@Table(name="Library")
public class Library {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private int code;
//	@Column(name="Name")
	private String name;
//	@Column(name="Author")
	private String author;
//	@Column(name="Date")
	private String date;
	public Library()
	{
		
	}
	public Library(int id,int code, String name, String author, String date) {
		super();
		this.code = code;
		this.name = name;
		this.author = author;
		this.date = date;
		this.id=id;
	}
	
	

	@Column(name="code")
	public int getCode() {
		return code;
	}


	public void setCode(int code) {
		this.code = code;
	}

	@Column(name="name")
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	@Column(name="author")
	public String getAuthor() {
		return author;
	}
	
	public void setAuthor(String author) {
		this.author = author;
	}
	@Column(name="date")
	public String getDate() {
		return date;
	}
	@Override
	public String toString() {
		return "Library [id=" + id + ", code=" + code + ", name=" + name + ", author=" + author + ", date=" + date
				+ "]";
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setDate(String date) {
		this.date = date;
	}

}
