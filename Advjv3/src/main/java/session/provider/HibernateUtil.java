package session.provider;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import hibernate.classes.User;

public class HibernateUtil {
	private static SessionFactory sessionFactory;

	public static SessionFactory getSessionFactory() {
		if (sessionFactory == null) {
			try {

				Configuration configuration = new Configuration().configure("hibernate.cfg.xml")
						.addAnnotatedClass(User.class);
				SessionFactory sessionFactory = configuration.buildSessionFactory();
				return sessionFactory;

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return sessionFactory;
	}
}
