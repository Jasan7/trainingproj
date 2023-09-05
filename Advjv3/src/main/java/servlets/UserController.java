package servlets;

import java.io.IOException;


import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;

import hibernate.classes.User;
import session.provider.HibernateUtil;


public class UserController extends HttpServlet {
	private static final long serialVersionUID = 1L;


	public UserController() {
		super();
		// TODO Auto-generated constructor stub
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
        
	    
		String name = request.getParameter("username");
		String password = request.getParameter("password");
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		
		User q = (User) session.createQuery("from User u where u.username =:x " + " AND u.password=:y").setParameter("x", name).setParameter("y", password).uniqueResult();
		
		
		
		
		if(name=="" || password=="") {
		    request.setAttribute("error","Username and Password cannot be null");
            RequestDispatcher rd=request.getRequestDispatcher("index.jsp");
            rd.forward(request, response);
		}
		
		if (q==null) {
			//response.sendRedirect(request.getContextPath() + "/error.jsp");
		   // request.setAttribute("error","Invalid username or password");
		    RequestDispatcher rd=request.getRequestDispatcher("error.jsp");
		    rd.forward(request, response);
		    
		} else {
			HttpSession httpsession =request.getSession();
			httpsession.setAttribute("id",q.getId());
			response.sendRedirect(request.getContextPath() + "/management.jsp");
		}

		session.getTransaction().commit();
		session.close();
	}
}
