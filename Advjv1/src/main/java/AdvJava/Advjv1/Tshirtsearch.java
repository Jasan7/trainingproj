package AdvJava.Advjv1;

public class Tshirtsearch {

	public static void main(String[] args){
		
		System.out.println("\t\t WELCOME TO T-SHIRT SEARCH PROGRAM \n");
		
		IpValidation iv = new IpValidation();
		
		String color = iv.color().toUpperCase();
		
		String gender = iv.gender().toUpperCase();
		
		String size = iv.size().toUpperCase();
		
		int choice = iv.opPreference();
		
		Threads t1 = new Threads(color, gender, size, choice); 
		
		t1.start();
	}

}
