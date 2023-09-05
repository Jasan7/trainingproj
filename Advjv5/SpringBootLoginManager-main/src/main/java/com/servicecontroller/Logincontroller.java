package com.servicecontroller;

import java.net.URISyntaxException;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.model.Employee;
import com.model.LoginManager;
import com.restservices.RestServor;



@Controller
public class Logincontroller {

	@RequestMapping("/")
	public String login() {

		return "login";
	}
	

	@RequestMapping("usernotfound")
	public String usernotfound() {

		return "usernotfound";
	}

	@RequestMapping("login")
	public String logout() {

		return "login";
	}
	
	@RequestMapping("error")
	public String error() {

		return "error";
	}


	@RequestMapping(value = "/addd")
	public String addEmployee(Employee emp, HttpSession session) throws URISyntaxException {
		RestServor.addEmployee(emp);
		Employee[] list = RestServor.getAllEmployee();
		session.setAttribute("list", list);
		return "welcome";
	}

	@RequestMapping(value = "/add" )
	public String uploadEmployee() throws URISyntaxException {

		return "add";
	}

	@RequestMapping("welcome")
	public String welcome() {

		return "welcome";
	}

	@RequestMapping(value = "/edit")
	public String editEmployee() {

		return "edit";
	}


	@RequestMapping(value = "/editt", method = RequestMethod.POST)
	public String edit(@ModelAttribute Employee emp, HttpSession session,@RequestParam("code")  int code,@RequestParam("id")  int id) {
		
		System.out.println("Editing here");
		try {
			RestServor.editEmployee(emp);

			Employee[] list = RestServor.getAllEmployee();
			session.setAttribute("list", list);
			return "welcome";
			
		} catch (Exception e) {
			
			return "error";
		}
	}
	
	@RequestMapping(value="/delete")
	public String delete(@RequestParam("id")  int id, HttpSession session) throws URISyntaxException {
		RestServor.deleteEmployee(id);
		Employee[] list = RestServor.getAllEmployee();
		session.setAttribute("list", list);
		return "welcome";
	}



	@RequestMapping("/validate")
	public String validate(HttpSession session, @RequestParam("userId") String userId,
			@RequestParam("password") String password) throws URISyntaxException {

		LoginManager hrm = RestServor.getUser(userId, password);
		System.out.println("Entering in validation");
		String message = "";
		if (hrm == null) {
			message = "Login ID or Password incorrect";
			session.setAttribute("message", message);
			return "usernotfound";
		}

		Employee[] list = RestServor.getAllEmployee();
		session.setAttribute("userName", hrm.getName());

		session.setAttribute("list", list);

		return "welcome";
	}
}