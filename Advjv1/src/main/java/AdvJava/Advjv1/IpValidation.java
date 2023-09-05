package AdvJava.Advjv1;

import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class IpValidation {
	public static final Scanner sc = new Scanner(System.in);

	public String color() {
		String color;
		boolean flag = false;
		Pattern p = Pattern.compile("[a-zA-Z]+"); 
		while (!flag) {
			System.out.print("Enter the Color: ");
			String c = sc.nextLine();
			Matcher m1 = p.matcher(c);
			if (m1.matches()) {
				color = c;
				flag = true;
				return color;			
			}else {
				System.out.println("Invalid Input! Please enter a proper color name: ");
			}
		}
		return null;
	}

	public String size() {
		String size;
		boolean valid = false;
		System.out.print("Enter the Size: ");

		while(!valid) {
			String s = sc.nextLine();
			if(s.equalsIgnoreCase("M") || s.equalsIgnoreCase("L") || s.equalsIgnoreCase("S") || s.equalsIgnoreCase("XL") || s.equalsIgnoreCase("XXL")) {
				size = s;
				valid = true;
				return size;
			}else {
				System.err.println("Size can only be S, M, L, XL OR XXL!");
				System.out.println("Please enter valid input: ");
			}
		}
		return null;
	}


	public String gender() {
		String gender;
		boolean valid = false;
		System.out.print("Enter the gender preference: ");

		while(!valid) {
			String g = sc.nextLine();
			if(g.equalsIgnoreCase("M") || g.equalsIgnoreCase("U") || g.equalsIgnoreCase("F")) {
				gender = g;
				valid = true;
				return gender;
			}else {
				System.err.println("Preference can only be U, M or F!");
				System.out.println("Please enter valid input: ");
			}
		}
		return null;
	}

	public int opPreference() {
		boolean valid = false;
		int input = 0;
		System.out.println("Please Specify Your Output Preference");
		System.out.println("1. By Price");
		System.out.println("2. By Rating");
		System.out.println("3. By both Price and Rating");
		System.out.print("Enter the serial number: ");
		while(!valid) {
			String s = sc.nextLine();
			try {
				input = Integer.parseInt(s);
				if(input <= 3) {
					valid = true;
				}else {
					System.out.println("Please enter an integer value: ");
				}
			}catch(NumberFormatException e) {
				System.out.println("Please enter an integer value only between 1 - 3: ");
			}
		}
		return input;
	}


}
