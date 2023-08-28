package com.app.Registration.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.app.Registration.model.Product;
import com.app.Registration.service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
	@Autowired
	private ProductService prodservice;	
	
	@GetMapping("/products")
	public List<Product> list(){
		return prodservice.listAll();
	}
	
	@GetMapping("/products/{id}")
	public ResponseEntity<Product> get(@PathVariable Integer id) {
		try{
			Product product = prodservice.get(id);
			return new ResponseEntity<Product>(product, HttpStatus.OK);
		}catch(NoSuchElementException e){
			return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
		}
	}

	
}