package servlets;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import org.hibernate.Session;

import hibernate.classes.*;
import hibernate.hql.ProductService;
import session.provider.HibernateUtil;

@MultipartConfig
public class ProductController extends HttpServlet {
	private static final long serialVersionUID = 1L;


	public ProductController() {
		super();
	}
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		if (request.getParameter("productId") != null) {
			deleteProduct(request, response);
		}
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		if (request.getParameter("addProduct") != null) {
			addProduct(request, response);
		} else if (request.getParameter("update") != null) {

			int productId = Integer.parseInt(request.getParameter("productId"));
			ProductManagement productObject = new ProductManagement();
			String productTitle = request.getParameter("productTitle");
			double productSize = Double.parseDouble(request.getParameter("productSize"));
			int productQuantity = Integer.parseInt(request.getParameter("productQuantity"));
			Part part = request.getPart("image");
			long checkSize = part.getSize();
			if (checkSize != 0) {
				if (checkSize <= 1000000) {
					if (totalByte(checkSize)) {
						byte[] image;
						InputStream fileInputStream = part.getInputStream();
						image = new byte[fileInputStream.available()];
						fileInputStream.read(image);
						productObject.setId(productId);
						productObject.setTitle(productTitle);
						productObject.setQuantity(productQuantity);
						productObject.setProductSize(productSize);
						productObject.setPreview(image);
						productObject.setSize(checkSize);
						ProductService.updateProduct(productObject, true);

						response.sendRedirect("management.jsp");
					} else {
						response.sendRedirect("management.jsp?totalSize=1");
					}
				} else {
					response.sendRedirect("management.jsp?size=1");
				}
			} else {
				productObject.setId(productId);
				productObject.setTitle(productTitle);
				productObject.setQuantity(productQuantity);
				productObject.setProductSize(productSize);
				ProductService.updateProduct(productObject, false);
				System.out.println("product not update");
				response.sendRedirect("management.jsp");
			}

		}
	}

	private static void addProduct(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		User user = new User();
		ProductManagement productObject = new ProductManagement();
		String title = request.getParameter("title");
		double productSize = Double.parseDouble(request.getParameter("size"));
		int quantity = Integer.parseInt(request.getParameter("quantity"));
		Part part = request.getPart("image");
		long size;
		size = part.getSize();
		if (size <= 1000000) {
			if (totalByte(size)) {

				byte[] image;
				HttpSession session = request.getSession();
				int id = (Integer) session.getAttribute("id");
				InputStream fileInputStream = part.getInputStream();
				image = new byte[fileInputStream.available()];
				fileInputStream.read(image);
				user.setId(id);
				productObject.setTitle(title);
				productObject.setQuantity(quantity);
				productObject.setProductSize(productSize);
				productObject.setPreview(image);
				productObject.setSize(size);
				ProductService.saveProduct(productObject, user);
				response.sendRedirect("management.jsp");
			} else {
				response.sendRedirect("management.jsp?totalSize=1");
			}
		} else {
			response.sendRedirect("management.jsp?size=1");
		}
	}

	private static boolean totalByte(long size) {
		long checkSize, totalSize, result;
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		try {
			checkSize = (Long) session.createQuery("SELECT sum(size) FROM ProductManagement").uniqueResult();
			totalSize = checkSize;
		} catch (NullPointerException e) {
			totalSize = 0L;
		}
		result = totalSize + size;
		if ((result) > 10000000L)
			return false;
		else
			return true;
	}

	private static void deleteProduct(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		User user = new User();
		ProductManagement product = new ProductManagement();
		int productId = Integer.parseInt(request.getParameter("productId"));
		HttpSession session = request.getSession();
		Integer id = (Integer) session.getAttribute("id");
		user.setId(id);
		product.setId(productId);
		ProductService.deleteProduct(user, product);
		response.sendRedirect("management.jsp?delete=suceess");
	}

}
