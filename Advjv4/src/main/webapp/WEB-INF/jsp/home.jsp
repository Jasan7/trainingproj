<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Search</title>
</head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">


<style>
h1 {
	text-align: center;
}

.container {
	height: 200px;
	position: relative;
}

.vertical-center {
	margin: 0;
	position: absolute;
	top: 50%;
	margin-left: 450px;
	-ms-transform: translateY(-50%);
	transform: translateY(-50%);
}
</style>
<body>
	<h1>Welcome to T-shirt Operations</h1>
	<hr />
	<div class="container">
		<div class="vertical-center">
			<a href="find" class="btn btn-primary" id="finder">Find Record </a> 
			<a href="index2" class="btn btn-danger">Back </a>
		</div>
	</div>

</body>
</html>