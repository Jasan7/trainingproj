package model;

import java.util.ArrayList;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import java.util.Iterator;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class EmployeeDao 
{
	private Configuration con;
	private SessionFactory factory;
	private Session session;
	private Transaction t;

		
																	// insert Record
	public void saveData(String user,UserClass e,HttpServletRequest request,HttpServletResponse  response) throws IOException, ServletException
	{
		con = new Configuration().configure("hibernate.cfg.xml");
		factory = con.buildSessionFactory();
		session = factory.openSession();
		t = session.beginTransaction();
		

		UserClass q2 = (UserClass) session.createQuery("from UserClass u where u.username =:z").setParameter("z",user).uniqueResult();
		
		if(q2!=null)
		{

			RequestDispatcher rd=request.getRequestDispatcher("UserExist");
		    rd.forward(request, response);
		    session.getTransaction().commit();
			session.close();
		}
		
		session.save(e);
		RequestDispatcher rd=request.getRequestDispatcher("RegisterComplete");
	    rd.forward(request, response);
		t.commit();
	}
	


															
															
													               // Search Record
	@SuppressWarnings("rawtypes")
	public List<TshirtClass> searchData(TshirtClass e) 
	{
		List<TshirtClass> li = new ArrayList<TshirtClass>();
		con = new Configuration().configure("hibernate.cfg.xml");
		factory = con.buildSessionFactory();
		session = factory.openSession();
		t = session.beginTransaction();
		List list = session.createQuery("from TshirtClass").list();
		Iterator it = list.iterator();
		while(it.hasNext())
		{
			TshirtClass emp = (TshirtClass)it.next();
			if((e.getGender().equalsIgnoreCase(emp.getGender()) && (e.getColour().equalsIgnoreCase(emp.getColour()) && (e.getSize().equalsIgnoreCase(emp.getSize())))))
			{
				TshirtClass obj = new TshirtClass();
				obj.setId(emp.getId());
				obj.setName(emp.getName());
				obj.setColour(emp.getColour());
				obj.setGender(emp.getGender());
				obj.setPrice(emp.getPrice());
				obj.setRating(emp.getRating());
				obj.setSize(emp.getSize());
				obj.setAvailable(emp.getAvailable());
				li.add(obj);
			}
			
		}
		session.getTransaction().commit();
		session.close();
		return li;
		
	}
															// Delete Record
	public void deleteData(TshirtClass emp) 
	{
		con = new Configuration().configure("hibernate.cfg.xml");
		factory = con.buildSessionFactory();
		session = factory.openSession();
		t = session.beginTransaction();
		TshirtClass obj = session.get(TshirtClass.class, emp.getcount());
		session.delete(obj);
		t.commit();
	}
	


	public void writedata(File filepath) throws IOException
	
		{

		BufferedReader lineReader = new BufferedReader(new FileReader (filepath));
		CSVParser records = CSVParser.parse(lineReader,CSVFormat.EXCEL.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
			
		SessionFactory factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(TshirtClass.class).buildSessionFactory();
		Session session = factory.openSession();
		session.beginTransaction();
		for(CSVRecord record:records)
		{
			TshirtClass tshirt = new TshirtClass();
			tshirt.setcount(0);
			tshirt.setId(record.get(0));
			tshirt.setName(record.get(1));
			tshirt.setColour(record.get(2));
			tshirt.setGender(record.get(3));
			tshirt.setSize(record.get(4));
			tshirt.setPrice(Float.parseFloat(record.get(5)));
			tshirt.setRating(Float.parseFloat(record.get(6)));
			tshirt.setAvailable(record.get(7));
			session.persist(tshirt);
		
		}			
		session.getTransaction().commit();
		session.close();
	}
	
	
	
	
	public void searchuser(String user,String pass,HttpServletRequest request,HttpServletResponse  response) throws IOException, ServletException
	{
		con = new Configuration().configure("hibernate.cfg.xml");
		factory = con.buildSessionFactory();
		session = factory.openSession();
		t = session.beginTransaction();
		

		UserClass q = (UserClass) session.createQuery("from UserClass u where u.username =:x " + " AND u.password=:y").setParameter("x",user).setParameter("y", pass).uniqueResult();
		
		if(user=="" || pass=="")
		{

			RequestDispatcher rd=request.getRequestDispatcher("error");
		    rd.forward(request, response);
			
		}
	
		else if(q!=null)
		{
			   RequestDispatcher rd=request.getRequestDispatcher("home");
			    rd.forward(request, response);
			   
		}

		else
		{
			RequestDispatcher rd=request.getRequestDispatcher("error");
		    rd.forward(request, response);
		}
		session.getTransaction().commit();
		session.close();
		
	}
}
	
	
	
	






















	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	






	
	
	
	
	
	




	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

