package com.App.services;

import java.util.List;
import java.util.NoSuchElementException;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.App.dao.LibraryDao;
import com.App.entity.Library;
import com.App.entity.LoginManager;

@Service
public class LibraryServiceImp  {
	@Autowired
	private LibraryDao librarydao;
	@Autowired
	EntityManager entityManager;
	
	public List<Library> getEmployees() {
		
		List<Library> list = (List<Library>) this.librarydao.findAll();
		return list;
	}
	
	public Library getEmployee(int code) {
		
		Library library = null;
		try {
			library = librarydao.getOne(code);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		return library;
	}

	public Library addEmployee(Library emp) {
		
		librarydao.save(emp);
		return emp;
	}

	public Library updateEmployee(Library emp, int code) {
		
		librarydao.save(emp);
		return emp;
	}

	@Transactional
	public void delete(int code) {
		
		librarydao.deleteById(code);
	}

	public LoginManager validateUser(String userId, String password) {

		
		Session session = entityManager.unwrap(Session.class);
		@SuppressWarnings("deprecation")
		Criteria criteria = session.createCriteria(LoginManager.class);
		criteria.add(Restrictions.eq("name", userId));
		criteria.add(Restrictions.eq("password", password));
		try {
			return (LoginManager) criteria.list().get(0);
		} catch (Exception e) {
			return null;
		}
		

	}
	

}
