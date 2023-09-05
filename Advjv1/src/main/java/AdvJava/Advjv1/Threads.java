package AdvJava.Advjv1;

import java.io.File;
import java.io.FileNotFoundException;

public class Threads extends Thread {
	private String color;
	private String gender;
	private String size;
    private int choice;
    
	public Threads(String color, String gender, String size, int choice) {
		this.color = color;
		this.gender = gender;
		this.size = size;
		this.choice = choice;
	}

	public void run() {		
		Directoryscanner dc = new Directoryscanner();

		File f = new File("./src/main/resources");
		File files[]= f.listFiles();

		try {
			System.out.println("\nReading CSV files.....");
			Thread.sleep(3000);
			for (int i = 0; i < files.length; i++) {

				System.out.print("" + files[i].getName() + "\t"); 
				dc.searchData(files[i], color, size, gender);
			}
			dc.viewpref(choice);
					
		}catch(InterruptedException e) {
			e.printStackTrace();
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
