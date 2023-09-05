package servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;

import hibernate.classes.User;
import hibernate.hql.UserService;
import session.provider.HibernateUtil;


@SuppressWarnings("serial")
public class Registration extends HttpServlet {

    public Registration() {
        
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username=req.getParameter("username");
        String password=req.getParameter("password");
        
        Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		
		User q = (User) session.createQuery("from User u where u.username =:x").setParameter("x", username).uniqueResult();
		
        
        if(username=="" || password=="") {
            req.setAttribute("message", "Username and Password cannot be null");
            RequestDispatcher rd=req.getRequestDispatcher("LoginRegistration.jsp");
            rd.forward(req, resp);
        }
        
        else if(q!=null)
        {
        	// req.setAttribute("message", "Registration Cant be Completed becuase Username already exists");
        	 RequestDispatcher rd=req.getRequestDispatcher("UserExist.jsp");
        	 rd.forward(req, resp);
        	session.getTransaction().commit();
    		session.close();
        	
        }
        
        else {
            User user=new User();
            user.setUsername(username);
            user.setPassword(password);
            UserService.saveUser(user);
            req.setAttribute("message", "Registration Completed");
            RequestDispatcher rd=req.getRequestDispatcher("LoginRegistration.jsp");
            rd.forward(req, resp);
        }
    }
    
}
