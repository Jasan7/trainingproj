package model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table (name ="tshirtclass")
public class TshirtClass
 {	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int count;
		private String Id;
		
		private String Name;
		private String Colour;
		private String Gender;
		private String Size;
		private float Price;
		private float Rating;
		private String Available;

		public TshirtClass() {
		}

		public TshirtClass(int count,String Id, String Name, String Colour, String Gender, String Size, float Price, float Rating,
				String Available) {
	
			this.Id = Id;
			this.Name = Name;
			this.Colour = Colour;
			this.Gender = Gender;
			this.Size = Size;
			this.Price = Price;
			this.Rating = Rating;
			this.Available = Available;

		}
		
		public int getcount()
		{
			return count;
			
		}
		public void setcount(int count)
		{
			this.count=count;
		}	
		
		public String getId()
		{
			return Id;
		}
		public void setId(String Id)
		{
			this.Id=Id;
			
		
		}
		public String getName()
		{
			return Name;
		}
		public void setName(String Name)
		{
			this.Name=Name;
			
		
		}
		public String getColour()
		{
			return Colour;
		}
		public void setColour(String Colour)
		{
			this.Colour=Colour;
			
		
		}
		public String getGender()
		{
			return Gender;
		}
		public void setGender(String Gender)
		{
			this.Gender=Gender;
			
		
		}
		public String getSize()
		{
			return Size;
		}
		public void setSize(String Size)
		{
			this.Size=Size;
					
		}
		public float getPrice()
		{
			return Price;
		}
		public void setPrice(float Price)
		{
			this.Price=Price;
			
		
		}
		public float getRating()
		{
			return Rating;
		}
		public void setRating(float Rating)
		{
			this.Rating=Rating;
			
		
		}
		public String getAvailable()
		{
			return Available;
		}
		public void setAvailable(String Available)
		{
			this.Available=Available;
		
		
		}
}
