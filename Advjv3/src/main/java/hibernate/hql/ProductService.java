package hibernate.hql;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import hibernate.classes.ProductManagement;
import hibernate.classes.User;
import session.provider.HibernateUtil;

@SuppressWarnings("deprecation")
public class ProductService {

	public static void saveProduct(ProductManagement product, User user) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		user = (User) session.get(User.class, user.getId());
		product.setUsername(user);
		System.out.println("save");
		List<ProductManagement> productList = new ArrayList<ProductManagement>();
		productList.add(product);
		user.setPreview(productList);
		session.save(user);
		session.getTransaction().commit();
		session.close();
	}

	@SuppressWarnings("unchecked")
	public static List<ProductManagement> showProducts(User user) {
		List<ProductManagement> productList = new ArrayList<ProductManagement>();
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Query query = session.createQuery("FROM ProductManagement WHERE username_id = :id").setParameter("id",user.getId());
		productList = query.list();
		return productList;
	}

	public static void updateProduct(ProductManagement product, boolean check) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		if (check) {
			System.out.println(check);
			Query query = session.createQuery("UPDATE ProductManagement SET title = :productTitle "+ ", quantity = :productQuantity" + ", productSize = :productSize"+ ", preview = :image , size = :imageSize" + " WHERE id = :productId");
			query.setParameter("productTitle", product.getTitle());
			query.setParameter("productQuantity", product.getQuantity());
			query.setParameter("productSize", product.getProductSize());
			query.setParameter("productId", product.getId());
			query.setParameter("image", product.getPreview());
			query.setParameter("imageSize", product.getSize());
			query.executeUpdate();
			session.getTransaction().commit();
			session.close();

		} else {
			Query query = session.createQuery("UPDATE ProductManagement SET title = :productTitle"+ ", quantity = :productQuantity" + ", productSize = :productSize" + " WHERE id = :productId");
			query.setParameter("productTitle", product.getTitle());
			query.setParameter("productQuantity", product.getQuantity());
			query.setParameter("productSize", product.getProductSize());
			query.setParameter("productId", product.getId());
			query.executeUpdate();
			session.getTransaction().commit();
			session.close();
		}
	}

	public static void deleteProduct(User user, ProductManagement product) {

		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Query query = session
				.createQuery("DELETE FROM ProductManagement WHERE username_id= :userName AND id = :productId");
		query.setParameter("userName", user.getId());
		query.setParameter("productId", product.getId());
		query.executeUpdate();
		session.getTransaction().commit();
		session.close();

	}

	public static String checkSize(int userId) {
		long checkSize = 0;
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		try {
			Query q = session.createQuery("SELECT sum(size) FROM ProductManagement where username_id= :username");
			q.setParameter("username", userId);
			checkSize = (Long) q.uniqueResult();
			System.out.println(checkSize);

		} catch (NullPointerException e) {

		}
		double size = (double) checkSize / 1000000;
		String str = String.format("%2.02f", size);
		System.out.println(str);
		return str;
	}

}
