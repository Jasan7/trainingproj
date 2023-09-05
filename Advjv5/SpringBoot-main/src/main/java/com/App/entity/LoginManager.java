package com.App.entity;

import javax.persistence.*;
@Entity
public class LoginManager {
	
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Id
	@GeneratedValue
	private String userid;
//	@Column(name="password")
	private String password;
//	@Column(name="Name")
	private String name;

}
