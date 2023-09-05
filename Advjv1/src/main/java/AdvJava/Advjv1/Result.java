package AdvJava.Advjv1;

import java.util.*;

public class Result {

	public void viewTshirts(ArrayList<Tshirt> tshirtList) {
		System.out.println("\n\n\t\t\t\t\t ---------- Tshirt Information ------------ \n");
		
		
		Formatter fmt = new Formatter();  
		fmt.format("%9s %18s %12s %12s %12s %12s %17s %22s\n", "ID","COLOR", "GENDER","SIZE", "PRICE", "RATING", "AVAILABILITY", "NAME");  
		for (Tshirt t : tshirtList)   
		{  
		fmt.format("%15s %12s %12s %12s %12s %12s %12s %44s\n" , t.getId(), t.getColor(), t.getGender(), t.getSize(), t.getPrice(), t.getRating(), t.getAvailable(), t.getName());  
		}  
		System.out.println(fmt);  
		
		if(tshirtList.isEmpty()) {
			System.err.println("\t\t\t\t\t             NO MATCHES FOUND");
		}
	}

}
