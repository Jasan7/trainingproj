/*SQL EXERCISE ASSIGNMENT - 06*/

/*Write a trigger for the Product table to ensure the list price can never be raised more than 15 Percent in a single change.
			 Modify the above trigger to execute its check code only if the ListPrice column is updated*/


/*CREATING THE TRIGGER */
USE AdventureWorks2008R2
go


CREATE TRIGGER PriceTrigger ON Production.Product 
FOR UPDATE
AS
DECLARE @calc AS INT
SELECT @calc=ListPrice FROM Production.Product AS p
BEGIN
IF @calc>(@calc*15)/100
PRINT 'You are Updating the List Prices by more then 15% Will Rollback Transaction';
ROLLBACK TRAN
END

DROP TRIGGER PriceTrigger;

GO



/*WHEN EVER WE WILL CHANGE OR UPDATE THE COLUMN:- LIST-PRICE, ENTRY BY MORE THAN 15% 
		TRIGGER WILL COME INTO ACTION AND WILL ROLLBACK THE TRANSACTION */
/*
ALTER TRIGGER PriceTrigger On Production.Product
FOR INSERT
AS
if update(ListPrice)
DECLARE @calc AS INT
SELECT @calc=ListPrice FROM Production.Product AS p
BEGIN
IF @calc>(@calc*15)/100
PRINT 'You are Updating the List Pricess by more then 15% Will Rollback Transaction';
ROLLBACK TRAN
END;

GO;
*/

/*THIS UPDATE WILL BE BLOCKED BY TRIGGER ACTION AS WE ARE INCREASING PARTICULAR LIST PRICE OF
							PRODUCT BY MORE THAN 15% */
UPDATE Production.Product
SET ListPrice=12
WHERE ProductID=712;



