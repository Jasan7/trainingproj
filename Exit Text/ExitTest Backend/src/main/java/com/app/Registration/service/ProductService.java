package com.app.Registration.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Registration.model.Product;
import com.app.Registration.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository prodrepo;
	
	public List<Product> listAll(){
		return prodrepo.findAll();
	}
	
	public Product get(Integer id) {
		return prodrepo.findById(id).get();
	}
	
	
}
