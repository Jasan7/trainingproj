package com.App.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.App.entity.Library;

public interface LibraryDao extends JpaRepository<Library, Integer> {
	
	 

}
