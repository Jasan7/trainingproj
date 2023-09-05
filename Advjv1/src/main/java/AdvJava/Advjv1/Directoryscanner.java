package AdvJava.Advjv1;

import java.io.*;
import java.util.*;

import com.opencsv.CSVReader;

class Directoryscanner {

	ArrayList<Tshirt> tshirtList = new ArrayList<Tshirt>();
	ArrayList<String> str_arr;
	Result view = new Result();

	public void searchData(File filename, String Colour, String Size, String Gender) throws FileNotFoundException{ 
		@SuppressWarnings("resource")
		Scanner sc = new Scanner(new FileReader(filename));

		while(sc.hasNext()) {
			String line = sc.nextLine().toUpperCase().toString();
			if (!line.isEmpty()) {
				StringTokenizer token = new StringTokenizer(line, "|");
				str_arr = new ArrayList<>(line.length());
				while (token.hasMoreTokens()) { 
					str_arr.add(token.nextToken());
				}
				if (str_arr.get(2).matches(Colour)) {
					if (str_arr.get(3).matches(Gender)) {
						if (str_arr.get(4).matches(Size)) {
							Tshirt product = new Tshirt(str_arr.get(0), str_arr.get(1), str_arr.get(2), str_arr.get(3), str_arr.get(4), Float.parseFloat(str_arr.get(5)), Float.parseFloat(str_arr.get(6)) ,str_arr.get(7));
							tshirtList.add(product);
						}
					}
				}
			}
		}
	}


	public void viewpref(int choiceCode) {
		if(choiceCode == 1) {
			Collections.sort(tshirtList, new Comparator<Tshirt>() { 
				@Override 
				public int compare(Tshirt t1, Tshirt t2) { 
					if (t1.getPrice() > t2.getPrice()) {
						return 1; 
					} else {
						return -1;
					}
				}
			});
		}else if (choiceCode == 2) {
			Collections.sort(tshirtList, new Comparator<Tshirt>() {
				@Override
				public int compare(Tshirt t1, Tshirt t2) {
					if (t1.getRating () > t2.getRating ()) {
						return -1;
					} else {
						return 1;
					}
				}
			});
		}else if (choiceCode == 3) {
			Collections.sort(tshirtList, new Comparator<Tshirt>() {
                @Override
				public int compare(Tshirt t1, Tshirt t2) {
					if (t1.getPrice() > t2.getPrice() && t1.getRating() > t2.getRating()) {
						return 1;
					} else {
						return -1;
					}
				}
			});
		}
		view.viewTshirts(tshirtList);
	}
}



