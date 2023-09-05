/*SQL EXERCISE ASSIGNMENT - 05*/

/*Write a Procedure supplying name information from the Person.Person table and accepting a filter for the first name. 
		Alter the above Store Procedure to supply Default Values if user does not enter any value.*/


/*Creating the Procedure to take input Full Name from Table and returning Only First Names */


CREATE PROCEDURE GetName @name nvarchar(30)
AS
BEGIN
SELECT p.FirstName
FROM Person.Person AS p
WHERE @name Like (p.FirstName+'%'+p.LastName)
END;
GO

/*Altering the Procedure to Print Provided Default Name from Table as user passed nothing*/

ALTER PROCEDURE GetName (@name nvarchar(30)='Ross Diaz')
AS BEGIN
SELECT p.FirstName
FROM Person.Person AS p
WHERE @name Like (p.FirstName+'%'+p.LastName)
END;
GO

/*Executing the Procedure & Passing the Full name as parameter in Procedure to return only First name */
EXEC getname 'Jade Morgan' ;

/*Executing the Procedure with null parameters to give default value provided in Alter Procedure*/
EXEC getname


DROP PROCEDURE getname
