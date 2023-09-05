package com.nagarro.TshirtInput;

import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Input {
	public static final Scanner sc = new Scanner(System.in);
	public static String color;
	public static String size;
	public static String gender;
	public static int outputPreference;

	public int getOutputPreference() {
		return outputPreference;
	}

	public void setOutputPreference(int outputPreference) {
		Input.outputPreference = outputPreference;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		Input.color = color;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		Input.size = size;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		Input.gender = gender;
	}

	public void color() {
		String color = null;
		boolean flag = false;
		Pattern p = Pattern.compile("[a-zA-Z]+");
		System.out.print("\nEnter the Color: "); 
		while (!flag) {		
			String c = sc.nextLine();
			Matcher m1 = p.matcher(c);
			if (m1.matches()) {
				color = c;
				flag = true;
						
			}else {
				System.err.println("Invalid Input!");
				System.out.print("Please enter a proper color name: ");
			}
		}
		setColor(color);
	}
	
	public void size() {
		String size = null;
		boolean valid = false;
		System.out.print("\nEnter the Size: ");

		while(!valid) {
			String s = sc.nextLine();
			if(s.equalsIgnoreCase("M") || s.equalsIgnoreCase("L") || s.equalsIgnoreCase("S") || s.equalsIgnoreCase("XL") || s.equalsIgnoreCase("XXL")) {
				size = s;
				valid = true;
			}else {
				System.err.println("\nSize can only be S, M, L, XL OR XXL!");
				System.out.print("Please enter valid input: ");
			}
		}
		setSize(size);
	}


	public void gender() {
		String gender = null;
		boolean valid = false;
		System.out.print("\nEnter the gender preference: ");

		while(!valid) {
			String g = sc.nextLine();
			if(g.equalsIgnoreCase("M") || g.equalsIgnoreCase("U") || g.equalsIgnoreCase("F")) {
				gender = g;
				valid = true;
				
			}else {
				System.err.println("\nPreference can only be U, M or F!");
				System.out.print("Please enter valid input: ");
			}
		}
		setGender(gender);
	}

	public void opPreference() {
		boolean valid = false;
		int input = 0;
		System.out.println("\nPlease Specify Your Output Preference");
		System.out.println("1. By Price");
		System.out.println("2. By Rating");
		System.out.println("3. By both Price and Rating");
		System.out.print("\nEnter the serial number: ");
		while(!valid) {
			String s = sc.nextLine();
			try {
				input = Integer.parseInt(s);
				if(input <= 3) {
					valid = true;
				}else {
					System.out.println("\nPlease enter an integer value only between 1 - 3: ");
				}
			}catch(NumberFormatException e) {
				System.out.println("\nPlease enter an integer value: ");
			}
		}
		setOutputPreference(input);
	}
	
	
}
