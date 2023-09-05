package com.galaxy;
import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import model.EmployeeDao;
import model.TshirtClass;
import model.UserClass;

@Controller
public class ControllerDemo 

{
	private ApplicationContext conn;

	//Goto Home Page
	@RequestMapping("/index2")
	public String view1()
	{
		return "index2";
	}

	@RequestMapping("/home")
	public String view11()
	{
		return "home";
	}

	@RequestMapping("/error")
	public String view10()
	{
		return "error";
	}

	@RequestMapping("/UserExist")
	public String view12()
	{
		return "UserExist";
	}

	@RequestMapping("/RegisterComplete")
	public String view13()
	{
		return "RegisterComplete";
	}


	@RequestMapping("/CsvLoaded")
	public String view14()
	{
		return "CsvLoaded";
	}

	// Goto Register Page
	@RequestMapping("/register")
	public String view2(Model m)
	{
		conn = new ClassPathXmlApplicationContext("ApplicationContext.xml");
		UserClass emp = conn.getBean("info1", UserClass.class);
		m.addAttribute("bean", emp);
		return "register";
	}
	// Save Record
	@RequestMapping("/store")
	public String view3(@ModelAttribute("bean") UserClass e, Model m,HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
	{

		String user = request.getParameter("username");
		conn = new ClassPathXmlApplicationContext("ApplicationContext.xml");
		EmployeeDao obj = conn.getBean("dao", EmployeeDao.class);
		obj.saveData(user,e,request,response);
		m.addAttribute("msg", "Record insert successfully...");
		return "register";
	}


	// Goto Search Page
	@RequestMapping("/find")
	public String view5(Model m)
	{
		conn = new ClassPathXmlApplicationContext("ApplicationContext.xml");
		TshirtClass emp = conn.getBean("info", TshirtClass.class);
		m.addAttribute("bean", emp);
		return "search";
	}
	// Search Record
	@RequestMapping("/search")
	public String view5(@ModelAttribute("bean") TshirtClass e, Model m)
	{
		conn = new ClassPathXmlApplicationContext("ApplicationContext.xml");
		EmployeeDao obj = conn.getBean("dao", EmployeeDao.class);
		List<TshirtClass> list = obj.searchData(e);
		if(!list.isEmpty())
		{
			m.addAttribute("data", list);
		}
		else
		{
			m.addAttribute("msg", "Oops! Record not found");
		}
		return "search";
	}
	// Delete Record
	@RequestMapping("/delete")
	public String view7(@ModelAttribute("bean") TshirtClass emp, Model m)
	{
		conn = new ClassPathXmlApplicationContext("ApplicationContext.xml");
		EmployeeDao obj = conn.getBean("dao", EmployeeDao.class);
		obj.deleteData(emp);
		m.addAttribute("msg", "Record delete successfully...");
		return "search";
	}


	@RequestMapping(value="/loadcsv"  ,method = RequestMethod.GET)
	public String view8() throws IOException
	{
		conn = new ClassPathXmlApplicationContext("ApplicationContext.xml");
		EmployeeDao obj = conn.getBean("dao", EmployeeDao.class);


		File filepath = new File("C:\\Users\\jasandeepsingh\\eclipse-workspace\\Advjv4\\src\\main\\resources");
		File files[] = filepath.listFiles();
		for(int i=0;i<files.length;i++)
		{
			obj.writedata(files[i]);	
		}


		//	obj.writedata(filepath);
		//	m.addAttribute("msg", "Record insert successfully...");
		return "CsvLoaded";
	}


	/*
	@RequestMapping("/login")
	public String view9(Model m)
	{
		conn = new ClassPathXmlApplicationContext("ApplicationContext.xml");
		UserClass emp = conn.getBean("info1", UserClass.class);
		m.addAttribute("bean", emp);
		return "searchuser";
	}
	 */

	// Search Record
	@RequestMapping(value="/login"  ,method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView checkUser(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

		ModelAndView mv = new ModelAndView();

		String username = request.getParameter("username");
		String password = request.getParameter("password");



		conn = new ClassPathXmlApplicationContext("ApplicationContext.xml");
		EmployeeDao obj = conn.getBean("dao", EmployeeDao.class);
		obj.searchuser(username,password,request,response);
		return mv;
	}

}






























