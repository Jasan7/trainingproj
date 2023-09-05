<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
<title>Main Page</title>
<style>
a {
	margin-right: 20px;
}
</style>

</head>
<body>
 <section class="vh-100">
 <nav class="navbar navbar-expand-lg navbar-dark bg-info">
			<a class="navbar-brand" href="index.jsp">T-Shirt Search Tool</a>
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
						href="register">Register User<span
							class="sr-only">(current)</span></a></li>
					<li class="nav-item active"><a class="nav-link"
						href="loadcsv">Load CSV Files<span
							class="sr-only">(current)</span></a></li>
				</ul>
			</div>
		</nav>
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image">
      </div>
      
     
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1" style="margin-top:30px">
       
         <form action="login" method="post">
                <div class="row mb-3">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">Email:</label>
                  <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail3" name = "username" placeholder="Enter your email">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputPassword3" class="col-sm-2 col-form-label">Password:</label>
                  <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword3" name="password" placeholder="Enter your password">
                  </div>
                </div>
                <input type="submit" value="login"class="btn btn-primary">
              </form>
        
      </div>
    </div>
  </div>
  
</section>
 </body>
 </html>


 