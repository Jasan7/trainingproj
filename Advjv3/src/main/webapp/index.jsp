<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/styles.css"/>
</head>

<body>
 <section class="vh-100">
 <nav class="navbar navbar-expand-lg navbar-dark bg-success">
			<a class="navbar-brand" href="index.jsp">Product Management Tool</a>
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
		</nav>
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image">
      </div>
      
     
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1" style="margin-top:30px";>
       
     <form action="UserController" method="post">

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0">SIGN IN..</p>
          </div>

          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="email"  class="form-control form-control-lg"
              placeholder="Enter a valid email address" id="username" name="username" required/>
            <label for ="username" class="form-label" for="form3Example3">Email address</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <input type="password"  class="form-control form-control-lg"
              placeholder="Enter password" id="password" name="password" required/>
            <label for ="password" class="form-label" for="form3Example4">Password</label>
          </div>
                 

          <div class="d-flex justify-content-between align-items-center">
            <!-- Checkbox -->
            <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label class="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <a href="LoginRegistration.jsp" class="text-body">Forgot password?</a>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
                <%
                            String login_msg=(String)request.getAttribute("error");
                            if(login_msg!=null)
                            out.println("<font color=red size=1px>"+login_msg+"</font>");
                            %>
              
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="LoginRegistration.jsp"
                class="link-danger">Register</a></p>
          </div>
        </form>
        
      </div>
    </div>
  </div>
  <div class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary" style="margin-top:42px" ;>
    <div class="text-white mb-3 mb-md-0">
      Copyright. All rights reserved.
    </div>  
  </div>
  
</section>
 </body>
 </html>


 