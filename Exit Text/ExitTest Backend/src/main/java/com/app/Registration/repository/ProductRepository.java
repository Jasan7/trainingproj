package com.app.Registration.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Registration.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	Optional<Product> findByPname(String pname);
}
