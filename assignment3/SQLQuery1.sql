
/*SQL EXERCISE ASSIGNMENT - 01*/

--Q1: Display the number of records in the [SalesPerson] table.

SELECT Count(BusinessEntityID) AS NumOfRecords
from Sales.SalesPerson;	


--Q2: Select both the FirstName and LastName of records from the Person table where the FirstName begins with the letter ‘B’.

SELECT FirstName,LastName FROM Person.Person
WHERE FirstName LIKE 'B%';


--Q3: Select a list of FirstName and LastName for employees where Title is one of Design Engineer, Tool Designer or Marketing Assistant.

SELECT DISTINCT FirstName,LastName,JobTitle
FROM HumanResources.Employee ,Person.Person 
WHERE JobTitle IN('Design Engineer','Marketing Assistant','Tool Designer');


--Q4: Display the Name and Color of the Product with the maximum weight..

SELECT Name ,Color
FROM Production.Product
WHERE Weight = (Select MAX(weight) from Production.Product);


--Q5: Display Description and MaxQty fields from the SpecialOffer table. Some of the MaxQty values are NULL, in this case display the value 0.00 instead.

SELECT Description, ISNULL(MaxQty,0.00) AS MaxQty
FROM Sales.SpecialOffer;


--Q6: Display the overall Average of the [CurrencyRate].[AverageRate] values for the exchange rate ‘USD’ to ‘GBP’ for the year 2005

select AVG(EndOfDayRate) as Average from Sales.CurrencyRate
where ToCurrencyCode like 'GBP' and CurrencyRateDate like '%2005%'


--Q7: Display the FirstName and LastName of records from the Person table where FirstName contains the letters ‘ss’.
--    Display an additional column with sequential numbers for each row returned beginning at integer 1.

SELECT ROW_NUMBER() OVER (ORDER BY BusinessEntityID ASC)as SequentialNumber, FirstName,LastName
FROM Person.Person 
WHERE FirstName LIKE '%ss%' and BusinessEntityID like '1%';


--Q8: Sales people receive various commission rates that belong to 1 of 4 bands..

SELECT DISTINCT(a.SalesPersonID),
CASE
	WHEN b.CommissionPct=0.00 THEN 'Band0'
    WHEN b.CommissionPct<=0.010 THEN 'Band1'
	WHEN b.CommissionPct<=0.015 THEN 'Band2'
	WHEN b.CommissionPct>0.015 THEN 'Band3'
	
	END AS Commision_Band

FROM Sales.SalesOrderHeader AS a , Sales.SalesPerson AS b
WHERE a.SalesPersonID=b.BusinessEntityID;


--Q9: Display the managerial hierarchy from Ruth Ellerbrock (person type – EM) up to CEO Ken Sanchez..

SELECT * FROM Person.Person
WHERE FirstName='Ruth'AND LastName='Ellerbrock' and PersonType='EM';

Exec dbo.uspGetEmployeeManagers @BusinessEntityID='48'


--Q10: Display the ProductId of the product with the largest stock level.

SELECT DISTINCT(ProductID),Quantity
FROM Production.ProductInventory
ORDER BY Quantity DESC ;

SELECT DISTINCT(ProductID),dbo.ufnGetStock('528') AS LargestStockProduct
FROM Production.ProductInventory
WHERE ProductID=528
GROUP BY ProductID;












