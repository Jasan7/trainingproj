package hibernate.classes;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	public Integer id;
	@Column(name = "username")
	private String username;
	@Column(name = "password")
	private String password;
	@OneToMany(mappedBy = "username", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	List<ProductManagement> preview;

	public List<ProductManagement> getPreview() {
		return preview;
	}

	public void setPreview(List<ProductManagement> preview) {
		this.preview = preview;
	}

	public int getCount() {
		return id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public User(Integer id, String username, String password, List<ProductManagement> preview) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.preview = preview;
	}

	public User() {
		super();

	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", preview=" + preview + "]";
	}

	public static int a = 5;

	public static int getIdCall() {
		return a++;
	}

}
