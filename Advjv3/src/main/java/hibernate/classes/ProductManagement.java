package hibernate.classes;

import java.util.Arrays;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity
public class ProductManagement {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String title;
	int quantity;
	double productSize;
	long size;
	@Lob
	byte[] preview;
	@ManyToOne
	@JoinColumn
	User username;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUsername() {
		return username;
	}

	public void setUsername(User username) {
		this.username = username;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getProductSize() {
		return productSize;
	}

	public void setProductSize(double productSize) {
		this.productSize = productSize;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public byte[] getPreview() {
		return preview;
	}

	@Override
	public String toString() {
		return "ProductManagement [id=" + id + ", title=" + title + ", quantity=" + quantity + ", productSize="
				+ productSize + ", size=" + size + ", preview=" + Arrays.toString(preview) + ", username=" + username
				+ "]";
	}

	public void setPreview(byte[] preview) {
		this.preview = preview;
	}

	public ProductManagement(int id, String title, int quantity, double productSize, long size, byte[] preview,
			User username) {
		super();
		this.id = id;
		this.title = title;
		this.quantity = quantity;
		this.productSize = productSize;
		this.size = size;
		this.preview = preview;
		this.username = username;
	}

	public ProductManagement() {
		super();
		// TODO Auto-generated constructor stub
	}

}
