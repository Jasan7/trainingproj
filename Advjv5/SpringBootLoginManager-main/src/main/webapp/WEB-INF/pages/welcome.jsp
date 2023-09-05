<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE html>
<html>
<head>
<title>Dashboard</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<style>
h1 {
	margin: 30px;
	margin-left:40%;
}

.table{
   display:flex;
   align-items:center;
   justify-content:center;
   margin-top:5%;
}

#ff {
	background-color: Royalblue;
	color: white;
	border-radius: 4px;
}
</style>
<body>
	<form action="login">
		<div style="border-bottom: solid 0px black">
			<div style="float: right; margin-right: 40px;">
				Hi ${userName} &nbsp<input id="ff" type="submit" value="Logout">
			</div>
		</div>
	</form>
	<div>
		<h1>Books Listing</h1>
	</div>

	<form action="add">
		<div class="buttn1" style="border-bottom: solid 0px black">
			<div class="col-auto" style="float: right; margin-right: 40px;">
				<input type="submit" class="btn btn-danger" id="ff"
					value="Add a Book" /> <a href="edit?id=${emp.id}"
					class="btn btn-danger">Edit a Book</a>
			</div>
		</div>

	</form>
	<br>
	<br>
	<table class="table">
		<tr>
			<td><p>
					<b>Book Code</b>
				</p>
			<td>
			<td><p>
					<b>Book Name</b>
				</p>
			<td>
			<td><p>
					<b>Author</b>
				</p>
			<td>
			<td><p>
					<b>Date Added</b>
				</p>
			<td>
			<td><p>
					<b>Actions</b>
				</p>
			<td>
		</tr>
		<c:forEach items="${list}" var="emp">
			<tr>
				<td><p>${emp.code}</p>
				<td>
				<td><p>${emp.name}</p>
				<td>
				<td><p>${emp.author}</p>
				<td>
				<td><p>${emp.date}</p>
				<td>
				<td><a href="delete?id=${emp.id}" class="btn btn-danger">Delete</a></td>
			</tr>
		</c:forEach>
	</table>

</body>
</html>