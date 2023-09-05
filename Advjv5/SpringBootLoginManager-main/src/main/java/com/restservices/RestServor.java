package com.restservices;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.model.Employee;
import com.model.LoginManager;

@RestController
public class RestServor {
	private final static RestTemplate restTemplate = new RestTemplate();
	public static Employee[] getAllEmployee() throws URISyntaxException {

		String url = "http://localhost:9092/employees";
		URI uri = new URI(url);

		try {
			return restTemplate.getForEntity(uri, Employee[].class).getBody();
		} catch (NoSuchElementException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Employee getEmployee(String code) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("code", Integer.valueOf(code));
		Employee emp = restTemplate.getForObject("http://localhost:9092/employees/{code}", Employee.class, params);
		return emp;
	}

	public static void addEmployee(Employee emp) throws URISyntaxException {
		String url = "http://localhost:9092/employees";
		URI uri = new URI(url);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<Employee> request = new HttpEntity<Employee>(emp, headers);
		restTemplate.postForEntity(uri, request, Employee.class);
	}
	
	
	public static void editEmployee(Employee emp) throws URISyntaxException  {
		String url = "http://localhost:9092/employees";
		URI uri;
		uri = new URI(url);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Employee> request = new HttpEntity<Employee>(emp, headers);
		System.out.println("In /edit employee"+request);
		restTemplate.postForEntity(uri, request, Employee.class);
	}
	
	
	public static LoginManager getUser(String userId, String password) {
		
		Map<String,String> params=new HashMap<String,String>();
		params.put("userId", userId);
		params.put("password", password);
		System.out.println("In RestServor"+userId+" "+password);
		LoginManager user=restTemplate.getForObject("http://localhost:9092/users/{userId}/{password}", LoginManager.class, params);
		return user;
	}
	
	public static void deleteEmployee(int code) {
		Map<String, Integer> params = new HashMap<String, Integer>();
		params.put("code", Integer.valueOf(code));
		restTemplate.delete("http://localhost:9092/employees/{code}", params);
	}
}
