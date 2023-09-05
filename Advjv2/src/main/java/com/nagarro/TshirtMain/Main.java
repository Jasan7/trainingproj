package com.nagarro.TshirtMain;

import java.io.*;
import java.util.*;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.nagarro.TshirtHQL.HQL;
import com.nagarro.TshirtInput.*;
import com.opencsv.CSVParser;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;

public class Main {
	public static void main(String[] args) throws CsvException, IOException, FileNotFoundException{

		SessionFactory factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Tshirt.class).buildSessionFactory();
		Session session = factory.openSession();
		session.beginTransaction();
		File open = new File("CSV");
		int count = 1;
		for (File openfile : open.listFiles()) {
			String file = "CSV\\" + openfile.getName();
			FileReader fr = new FileReader(file);

			CSVParser parser = new CSVParserBuilder().withSeparator('|').build();

			CSVReader csvReader = new CSVReaderBuilder(fr).withCSVParser(parser).withSkipLines(1).build();
			List<String[]> allData = csvReader.readAll();
			for (String[] row : allData) {
				Tshirt tshirt = new Tshirt();

				tshirt.setProductId(row[0]);
				tshirt.setName(row[1]);
				tshirt.setColor(row[2]);
				tshirt.setGender(row[3]);
				tshirt.setSize(row[4]);
				tshirt.setPrice(Float.parseFloat(row[5]));
				tshirt.setRating(Float.parseFloat(row[6]));
				tshirt.setAvailability(row[7]);
				tshirt.setCount(count);
				count++;
				session.save(tshirt);
			}
		}
		session.getTransaction().commit();
		Input ip = new Input();
		HQL hql = new HQL();
		ip.color();
		ip.size();
		ip.gender();
		ip.opPreference();
		hql.getOutput(session);

	}
}