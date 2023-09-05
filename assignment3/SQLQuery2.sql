/*SQL ASSIGNMENT - 02*/

/*Problem Statemt: Write separate queries using a join, a subquery, a CTE, 
and then an EXISTS to list a AdventureWorks customers who have not placed an order.*/

--USING JOIN

SELECT * FROM Sales.Customer a
LEFT OUTER JOIN Sales.SalesOrderHeader b ON a.CustomerID = b.CustomerID
WHERE b.SalesOrderID IS NULL
ORDER BY a.CustomerID


--USING SUBQUERY

SELECT * FROM Sales.Customer
WHERE CustomerID NOT IN (SELECT CustomerID FROM Sales.SalesOrderHeader WHERE SalesOrderID IS NOT NULL );


--USING CTE

WITH customer
AS
(	SELECT DISTINCT a.* 
	FROM Sales.Customer AS  a , Sales.SalesOrderHeader AS b
	WHERE a.CustomerID NOT IN (SELECT CustomerID FROM Sales.SalesOrderHeader WHERE SalesOrderID IS NOT NULL )
	)
SELECT *
FROM customer;


--USING EXISTS

SELECT * FROM Sales.Customer AS a
WHERE NOT EXISTS 
	(
		SELECT * FROM Sales.SalesOrderHeader AS b WHERE a.CustomerID=b.CustomerID 
) 
	

