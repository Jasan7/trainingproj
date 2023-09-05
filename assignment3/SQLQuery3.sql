/*SQL ASSIGNMENT - 03*/


/*Problem Statement: Show the most recent five orders that were purchased from account numbers 
that have spent more than $70,000 with AdventureWorks.*/


/*SOLUTION 1 :- USING VIEW AND COLUMN (LINE TOTAL) FROM ANOTHER TABLE */ 

CREATE VIEW showing 
AS
SELECT a.SalesOrderID, SUM(LineTotal) AS Total
FROM Sales.SalesOrderDetail a
GROUP BY a.SalesOrderID
HAVING sum(LineTotal)>70000
GO
SELECT TOP(5)b.* FROM showing a,Sales.SalesOrderHeader b
WHERE a.SalesOrderID = b.SalesOrderID 
ORDER BY b.OrderDate DESC ;



/* SOLUTION 2 :-  USING SUBQUERY WITH COLUMN (TOTAL DUE) FROM SINGLE TABLE  */ 

SELECT TOP(5)a.* FROM Sales.SalesOrderHeader AS a
WHERE a.SalesOrderID IN (
				SELECT a.SalesOrderID
				FROM Sales.SalesOrderHeader a
GROUP BY a.SalesOrderID 
HAVING Sum(a.TotalDue)>70000 
)
ORDER BY a.SalesOrderID DESC ;


