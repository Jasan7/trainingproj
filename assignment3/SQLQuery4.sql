/*SQL EXERCISE ASSIGNMENT - 04*/

/*Create a function that takes as inputs a SalesOrderID, a Currency Code, and a date, and returns a table of all the SalesOrderDetail 
	rows for that Sales Order including Quantity, ProductID, UnitPrice, and the unit price converted to the target currency based 
	      on the end of day rate for the date provided. Exchange rates can be found in the Sales.CurrencyRate table.*/


CREATE FUNCTION MyFunction(@SalesOrderid int,@Currency nchar(3), @Date datetime)
RETURNS TABLE
AS RETURN
(SELECT a.*,a.UnitPrice *b.EndOfDayRate AS CalculatedPrice
FROM Sales.SalesOrderDetail AS a,Sales.CurrencyRate AS b
WHERE @Currency=b.ToCurrencyCode AND @Date=b.CurrencyRateDate AND @SalesOrderid=a.SalesOrderID
)
GO


/*Running the Function to Execute and Return the Table with Calculated Price Column*/

SELECT *
FROM MyFunction(43659,'GBP','2005-07-01');

DROP FUNCTION MyFunction;

