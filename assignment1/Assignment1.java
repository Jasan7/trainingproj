import java.util.*;
import java.util.regex.*;

public class Assignment1 {

	public static void main(String[] args) {
		boolean flag = false;    //will help in deciding the number of input cars 
		Scanner sc = new Scanner(System.in);
		Car car = new Car();    //car object created of "Car" class
		Pattern p = Pattern.compile("[^a-zA-Z0-9]+"); 
        
		/*  Taking Inputs  */
		while (!flag) {
			/*  Car Model  */ 
			System.out.println("Enter the Model of the Car:");
			String model = sc.nextLine();
			Matcher m1 = p.matcher(model);
			if (m1.matches()) {
				System.out.println("Invalid Input");
				return;
			}
			car.setModel(model);
			
            /*  Car Type  */
			System.out.println("Enter the Type of the Car:");
			String type = sc.nextLine();
			Matcher m2 = p.matcher(type);
			if (m2.matches() || (!type.equalsIgnoreCase("Sedan") && !type.equalsIgnoreCase("Hatchback") && !type.equalsIgnoreCase("SUV"))) {
				System.out.println("Invalid Car Type! Please try again.");
				return;
			}
			car.setType(type);
            
			/*  Car Price  */
			System.out.println("Enter the Price of the Car:");
			double costp = 0;
			try {
				costp = sc.nextDouble();sc.nextLine();
				if(costp < 0) {
					throw new Exception();
				}
			}catch(InputMismatchException n) {
				System.out.println("Please Enter only Numeric Value!");
				return;
			}catch(Exception m) {
				System.out.println("Please Enter only Positive Value!");
				return;
			}
			car.setCp(costp);
	        
			/*  Insurance Type  */
			System.out.println("Enter the Type of Insurance of the Car:");
			String instype = sc.nextLine();
			Matcher m3 = p.matcher(instype);
			if (m3.matches() || (!instype.equalsIgnoreCase("Basic") && !instype.equalsIgnoreCase("Premium"))) {
				System.out.println("Invalid Insurance type! Please try again.");
				return;
			}
			car.setInstype(instype);

			System.out.println("Do you want to enter details of any other car (y/n):");
			String yn = sc.nextLine();
			if (yn.equalsIgnoreCase("n")) {
				flag = true;
				sc.close();
			}
			String ins = String.format("%.2f", insurance(car));//insurance method called with returned value stored in "ins" variable
			System.out.println("\nCar Model: " + car.getModel() + "\nCarPrice: " + car.getCp() + "\nTotal Insurance Paid: " + ins + "\n");
		}    
	}

	/*  Method to calculate the final "insurance to be paid" */
	public static double insurance(Car car) {
		double ans = 0;//final calculated amount that'll be returned initially set to 0
		if (car.getType().equalsIgnoreCase("Hatchback")) {
			ans = ans + (car.getCp() * 5) / 100;
			if (car.getInstype().equalsIgnoreCase("Premium")) {
				ans = ans + (20 * ans) / 100;
			}
			return ans;
		} else if (car.getType().equalsIgnoreCase("Sedan")) {
			ans = ans + (car.getCp() * 8) / 100;
			if (car.getInstype().equalsIgnoreCase("Premium")) {
				ans = ans + (20 * ans) / 100;
			}
			return ans;
		} else if (car.getType().equalsIgnoreCase("SUV")) {
			ans = ans + (car.getCp() * 1) / 10;
			if (car.getInstype().equalsIgnoreCase("Premium")) {
				ans = ans + (20 * ans) / 100;
			}
			return ans;
		}
		return ans;
	}
}
