package hibernate.hql;

import org.hibernate.Session;

import hibernate.classes.User;
import session.provider.HibernateUtil;

public class UserService {

	public UserService() {

	}

	public static void saveUser(User user) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		session.save(user);
		session.getTransaction().commit();
		session.close();
	}

}
