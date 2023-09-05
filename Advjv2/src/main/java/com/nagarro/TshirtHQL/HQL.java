package com.nagarro.TshirtHQL;

import com.nagarro.TshirtInput.*;
import com.nagarro.TshirtMain.Tshirt;

import java.util.Formatter;
import java.util.List;

import org.hibernate.Session;

import org.hibernate.query.Query;

public class HQL {

	public void getOutput(Session session) {
		Input input = new Input();
		String priority = "";
		if (input.getOutputPreference() == 1)
			priority = "from Tshirt t where t.color=:Color and t.size=:size and t.gender=:gender order by t.price";
		else if (input.getOutputPreference() == 2)
			priority = "from Tshirt t where t.color=:Color and t.size=:size and t.gender=:gender order by t.rating desc";
		else if (input.getOutputPreference() == 3)
			priority = "from Tshirt t where t.color=:Color and t.size=:size and t.gender=:gender order by t.price,t.rating";
		Query<Tshirt> query = session.createQuery(priority, Tshirt.class);
		query.setParameter("Color", input.getColor());
		query.setParameter("size", input.getSize());
		query.setParameter("gender", input.getGender());
		System.out.println("\n\n\t\t\t\t\t ---------- Tshirt Information ------------ \n");

		List<Tshirt> list = query.list();
		if (list.size() == 0) {
			System.err.println("\t\t\t\t\t             NO MATCHES FOUND");
		}
		
		Formatter fmt = new Formatter();  
		fmt.format("%9s %18s %12s %12s %12s %12s %17s %21s\n", "ID","COLOR", "GENDER","SIZE", "PRICE", "RATING", "AVAILABILITY", "NAME");  
		for (Tshirt t : list)   
		{  
			fmt.format("%15s %12s %12s %12s %12s %12s %12s %41s\n" , t.getId(), t.getColor(), t.getGender(), t.getSize(), t.getPrice(), t.getRating(), t.getAvailable(), t.getName());  
		}  
		System.out.println(fmt);  

	}

}
