<%@page import="org.hibernate.Query"%>
<%@page import="session.provider.HibernateUtil"%>
<%@page import="org.hibernate.Session"%>
<%@page import="java.util.Base64"%>
<%@page import="java.util.Iterator"%>
<%@page import="hibernate.hql.ProductService"%>
<%@page import="hibernate.classes.ProductManagement"%>
<%@page import="java.util.List"%>
<%@page import="hibernate.classes.User"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<html>
<head>
<title>Product Management Tool</title>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<!-- Bootstrap CSS -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
	integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
	crossorigin="anonymous"></script>
<script
	src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
	integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
	crossorigin="anonymous"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
	integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
	crossorigin="anonymous"></script>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
	integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
	crossorigin="anonymous">
<link type="text/css" rel="stylesheet" href="css/complete.css" />

</head>
<body>
	<%
		request.getSession();
		Integer id;
		int check;
		try {
			check = (Integer) session.getAttribute("id");
			id = check;
		} catch (NullPointerException e) {
			id = 0;
		}
		if (id != 0) {
	%>
	<div class="container-fluid">
		<nav class="navbar navbar-expand-lg navbar-dark bg-success">
			<a class="navbar-brand" href="management.jsp">Product Management
				Tool</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse"
				data-target="#navbarNav" aria-controls="navbarNav"
				aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item active"><a class="nav-link"
						href="index.jsp">Home <span class="sr-only">(current)</span></a></li>
					<li class="nav-item active"><a class="nav-link"
						href="LoginRegistration.jsp">Register User<span
							class="sr-only">(current)</span></a></li>
			</div>
			<div class="collapse navbar-collapse justify-content-end"
				id="navbarSupportedContent">
				<ul class="navbar-nav">
					<li class="nav-item active"><a class="nav-link"
						href="index.jsp">Logout <span class="sr-only">(current)</span></a>
					</li>
				</ul>
			</div>
		</nav>

		<form action="ProductController" method="post" class="row mt-4"
			enctype="multipart/form-data" name="form">

			<div class="col-lg-8 col-md-6"
				style="margin-top: 0px; margin-bottom: 0px; margin-left: 250px;">

				<p class="col-sm-12 col-lg-8 col-8 col-md-6"
					style="margin-left: 200px;">Please enter product details to add
					to stock</p>

				<div class="form-row">
					<div class="col-5">
						<label class="sr-only" for="inlineFormInput">Name</label> <input
							type="text" class="form-control mb-2" id="inlineFormInput"
							required name="title" placeholder="Enter Product Title">
					</div>
					<div class="col-5">
						<label class="sr-only" for="inlineFormInput">Quantity</label> <input
							type="number" class="form-control mb-2" id="inlineFormInput"
							required name="quantity" placeholder="Enter Product Quantity">
					</div>
					<div class="col-5">
						<label class="sr-only" for="inlineFormInput">Size</label> <input
							type="number" class="form-control mb-2" id="inlineFormInput"
							required name="size" placeholder="Enter Product Size">
					</div>

					<div class="col-5">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="selectedFile">Upload</span>
							</div>
							<div class="custom-file">
								<input type="file" class="custom-file-input" id="selectedFile"
									required name="image" accept="image/x-png,image/gif,image/jpeg">
								<label class="custom-file-label" for="inputGroupFile01">Choose
									file</label>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div
				style="margin-top: 30px; margin-bottom: 0px; margin-left: 500px;">
				<div class="justify-content-center">
					<input class="btn btn-primary btn-lg" type="submit"
						name="addProduct" value="Submit" onClick="return validate();" />
					<input class="btn btn-danger btn-lg" type="reset" value="Cancel" />
				</div>
			</div>
		</form>



		<div class="col-lg-10" style="margin-top: 30px; margin-bottom: 0px;">
		</div>
		<div class="col-lg-12 col-12 col-sm-12 col-md-12">
			<div class="table-wrapper-scroll-y my-custom-scrollbar"
				style="overflow-y: auto; height: 250px">
				<table class="table table-bordered" id="studentList">
					<thead class=" text-dark ">
						<tr>
							<th>S.No</th>
							<th>Title</th>
							<th>Quantity</th>
							<th>Size</th>
							<th>Image</th>
							<th>Actions</th>
						</tr>
					</thead>

					<%!String title, productSize, quantity;

	int productId;
	int count = 0;%>
					<%
						String totalImageSize = ProductService.checkSize(id);
							System.out.println(totalImageSize);
							User user = new User();
							user.setId(id);
							List<ProductManagement> productList = ProductService.showProducts(user);
							Iterator<ProductManagement> it = productList.iterator();
							count = 0;
							while (it.hasNext()) {
								ProductManagement productObject = (ProductManagement) it.next();
								byte[] image = productObject.getPreview();
								String imgDataBase64 = new String(Base64.getEncoder().encode(image));
								productId = productObject.getId();
								title = productObject.getTitle();

								productSize = Double.toString(productObject.getProductSize());
								quantity = Integer.toString(productObject.getQuantity());
					%>
					<tbody style="overflow-y: scroll;">
						<tr>
							<td><%=++count%></td>
							<td><%=title%></td>
							<td><%=quantity%></td>
							<td><%=productSize%></td>
							<td><img alt="image" style="width: 180px; height: 100px"
								src="data:image/jpg;base64,<%=imgDataBase64%>"></td>
							<td><a href="?updateId=<%=productId%>"
								class="btn btn-primary"> Update</a> &nbsp; <a
								href="ProductController?productId=<%=productId%>"
								class="btn btn-danger ">Delete</a></td>
						</tr>
						<%
							}
						%>
					</tbody>
				</table>
			</div>
		</div>
		<div>
			<p></p>
		</div>
	</div>
	<%
		if (request.getParameter("updateId") != null) {
				int updateId = Integer.parseInt(request.getParameter("updateId"));
				Session hsession = HibernateUtil.getSessionFactory().openSession();
				hsession.beginTransaction();
				Query query = hsession.createQuery("FROM ProductManagement WHERE id = :productId")
						.setParameter("productId", updateId);
				ProductManagement productObject = (ProductManagement) query.uniqueResult();
	%>
	<script type="text/javascript">
		window.onload = function() {
			$('#exampleModal').modal('show');
		}
	</script>
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Update Form</h5>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form action="ProductController" method="Post"
						enctype="multipart/form-data">
						<div class="form-group">
							<label for="recipient-name" class="col-form-label">Product
								Id</label> <input type="text" readonly name="productId"
								value="<%=updateId%>" class="form-control" id="recipient-name">
						</div>
						<div class="form-group">
							<label for="recipient-name" class="col-form-label">Title</label>
							<input type="text" class="form-control" required
								name="productTitle" id="recipient-name"
								value="<%=productObject.getTitle()%>">
						</div>
						<div class="form-group">
							<label for="recipient-name" class="col-form-label">Quantity</label>
							<input type="number" class="form-control" required
								name="productQuantity" id="recipient-name"
								value="<%=productObject.getQuantity()%>">
						</div>
						<div class="form-group">
							<label for="recipient-name" class="col-form-label">Size</label> <input
								type="number" step="any" class="form-control" required
								name="productSize" id="recipient-name"
								value="<%=productObject.getProductSize()%>">
						</div>

						<div class="form-group">
							<label for="message-text" class="col-form-label">Image</label> <input
								type="file" class="form-control" name="image" id="message-text">
						</div>
						<div class="modal-footer">
							<button class="btn btn-secondary" data-dismiss="modal"
								onclick="document.location.href='management.jsp'">Close</button>
							<input type="submit" class="btn btn-primary" name="update"
								value="Update">
						</div>
					</form>

				</div>

			</div>
		</div>
	</div>
	<%
		}
	%>
	<%
		if (request.getParameter("delete") != null) {
	%>
	<div class="row d-flex justify-content-center fixed-top">
		<div class="col-lg-6 ">
			<div
				class="alert alert-danger alert-dismissible fade show d-flex justify-content-center"
				id="alert">
				<button type="button" class="close"
					onclick="document.location.href='management.jsp'"
					data-dismiss="alert">&times;</button>
				<strong> Product has been Deleted</strong>
			</div>
		</div>
	</div>
	<%
		}
	%>

	<%
		if (request.getParameter("totalSize") != null) {
	%>
	<div class="row d-flex justify-content-center fixed-top">
		<div class="col-lg-6 ">
			<div
				class="alert alert-danger alert-dismissible fade show d-flex justify-content-center"
				id="alert">
				<button type="button" class="close"
					onclick="document.location.href='management.jsp'"
					data-dismiss="alert">&times;</button>
				<strong>Error! </strong>Total size of images must be less than 10 MB
			</div>
		</div>
	</div>
	<%
		}
	%>

	<%
		if (request.getParameter("size") != null) {
	%>
	<div class="row d-flex justify-content-center fixed-top">
		<div class="col-lg-6 ">
			<div
				class="alert alert-danger alert-dismissible fade show d-flex justify-content-center"
				id="alert">
				<button type="button" class="close"
					onclick="document.location.href='management.jsp'"
					data-dismiss="alert">&times;</button>
				<strong>Error! </strong> Image Size Must Be 1 MB Or Less.
			</div>
		</div>
	</div>
	<%
		}
	%>

	<%
		} else {
			response.sendRedirect("error.jsp");
		}
	%>


</body>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script>
	function validate() {
		var file = form.image.value;
		var reg = /(.*?)\.(jpg|bmp|jpeg|png)$/;
		if (file == "") {
			alert("Please upload Image");
		} else if (!file.match(reg)) {
			alert("Invalid File");
			return false;
		}
	}
</script>
</html>