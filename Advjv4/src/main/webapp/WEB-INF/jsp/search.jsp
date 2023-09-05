<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page isELIgnored="false"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>search</title>
</head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">

<style>
table {
	width: 95%;
	border: 2px solid black;
}
th,td{
    border: 2px solid black;
}
a {
	margin-right: 20px;
}
</style>

<body>

	<nav class="navbar navbar-expand-lg navbar-dark bg-info">
		<a class="navbar-brand" href="index.jsp">T-Shirt Search Tool</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse"
			data-target="#navbarNav" aria-controls="navbarNav"
			aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item active"><a class="nav-link" href="home">Home
						<span class="sr-only">(current)</span>
				</a></li>
				<li class="nav-item active"><a class="nav-link" href="register">Register
						User<span class="sr-only">(current)</span>
				</a></li>
			</ul>
		</div>
	</nav>
	<br>
	<br>




	<form:form action="search" method="post" modelAttribute="bean">
		
	&nbsp;&nbsp;&nbsp;	T-Shirt Colour : <form:input path="colour" /> &nbsp;
		Your Gender : <form:input path="gender" /> &nbsp;
		Size : <form:input path="size" /> &nbsp;
		
	<input type="submit" class="btn btn-primary" value="Search">
	</form:form>
	<br />
	<div style="margin-left: 35px">
		<table>
			<tr>
				<th>Id</th>
				<th>Name</th>
				<th>Colour</th>
				<th>Size</th>
				<th>Gender</th>
				<th>Price</th>
				<th>Rating</th>
				<th>Available</th>
			</tr>
			<c:forEach var="tab" items="${data }">
				<tr>
					<td>${tab.id}</td>
					<td>${tab.name}</td>
					<td>${tab.colour }</td>
					<td>${tab.size}</td>
					<td>${tab.gender}</td>
					<td>${tab.price}</td>
					<td>${tab.rating}</td>
					<td>${tab.available}</td>


				</tr>
			</c:forEach>

		</table>
	</div>
	<div align="center">
		<h2>${msg }</h2>
	</div>

	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"></script>
</body>
</html>