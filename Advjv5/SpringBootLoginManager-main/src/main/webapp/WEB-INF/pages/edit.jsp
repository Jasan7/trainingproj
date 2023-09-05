<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ page import="java.io.*,java.util.*, javax.servlet.*"%>
<!DOCTYPE html >
<html>
<head>
<title>Product Management Tool</title>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<title>Hello, world!</title>
<style type="text/css">
body {
	display: inline;
	margin: 0px;
	font-weight: 400;
	font-family: Arial, Helvetica, sans-serif;
}

table, th, td {
	border: 1px solid black;
	border-collapse: collapse;
	text-align: center;
}

#tb {
	margin-left: 18px;
}

img {
	margin: 5px;
}

#hiddenDiv {
	position: fixed;
	display: none;
	top: 33%;
	left: 45%;
	background-color: white;
}

#overlay {
	width: 100%;
	height: 100%;
	background-color: grey;
	opacity: 0.7;
	position: fixed;
	display: none;
}

table {
	margin-left: 18px;
}

legend {
	margin: auto;
}

#abc1 {
	margin-left: 220px;
	width: 200px;
	border-radius: 2px;
}

#abc2 {
	margin-left: 255px;
	width: 200px;
	border-radius: 2px;
}

#abc3 {
	margin-left: 246px;
	width: 200px;
	border-radius: 2px;
}

#abc4 {
	margin-left: 226px;
	width: 200px;
	border-radius: 2px;
}

#abc5 {
	margin-left: -1px;
	width: 200px;
	border-radius: 2px;
}

.btn {
	margin: 10px;
	margin-left: 35px;
}

label {
	margin-left: 50px;
}
</style>
</head>
<body>
	<div id="overlay"></div>
	<div id="hiddenDiv">
		<form id="changeImgNameForm" method="post" action="ImageEdit">
			<fieldset>
				<legend>Change Image Name</legend>
				<label>Enter Name : <Input name="name" required></label><br>
				<br> <input type="submit">
			</fieldset>
		</form>
	</div>
	<div>
		<form action="logout">
			<div style="border-bottom: solid 0px black">
				<div style="float: right; margin-right: 40px;">
					Hi ${userName} &nbsp<input type="submit" value="Logout">
				</div>
			</div>
		</form>
		<div align=center>
			<h1>Update Book Details</h1>
		</div>
	</div>
	<br>
	<div id="tb">

		<form action="editt" method="post">

			<label>Book ID</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input
				type="text" id="abc5" name="id" required><br>
			<br> <label>Book Code</label><input type="text" id="abc1"
				name="code" required><br>
			<br> <label>Name</label><input type="text" id="abc2" name="name"
				required><br>
			<br> <label>Authors:- </label> <label>William
				Shakespeare</label><input type="radio" name="author"
				value="William Shakespeare"> <label>Anne Frank</label><input
				type="radio" name="author" value="Anne Frank"> <label>James
				Rowling</label><input type="radio" name="author" value="James Rowling">

			<br> <br> <label>Added On</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input
				type="text" name="date"
				value="
<%Date dNow = new Date();
			Date date = new Date();
			out.print(date.toString());%>" />

			<div class="buttn1">
				<!--Button -->
				<div class="col-auto">
					<input type="submit" class="btn btn-info" value="Submit" /> <input
						type="button" class="btn btn-danger" onclick="fun()"
						value="Cancel" />


				</div>
			</div>
		</form>
	</div>

	<table class="table">
		<tr>

			<td><p>
					<b>Book ID</b>
				</p>
			<td>
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
		</tr>
		<c:forEach items="${list}" var="emp">
			<tr>

				<td><p>${emp.id}</p>
				<td>
				<td><p>${emp.code}</p>
				<td>
				<td><p>${emp.name}</p>
				<td>
				<td><p>${emp.author}</p>
				<td>
				<td><p>${emp.date}</p>
				<td>
			</tr>
		</c:forEach>
	</table>


	<script>
		function fun() {
			window.location = "welcome";

		}
	</script>


	<script src="\WEB-INF\pages\index.js" type="text/javascript"></script>

</body>
</html>