USE [AdminWebApiDB]
GO
/****** Object:  StoredProcedure [dbo].[GetRecepit]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create Proc [dbo].[GetRecepit]

@PaymentID int

as

begin

select 

MR.MemberNo,

MR.MemberFName+' '+ MR.MemberMName +' '+MR.MemberLName  as MemberName,

SM.SchemeName,

PM.PlanName,

CONVERT(varchar(10), PD.PaymentFromdt, 105) AS PaymentFromdt,

CONVERT(varchar(10), PD.PaymentTodt, 105) AS PaymentTodt,

CONVERT(varchar(10), PD.NextRenwalDate, 105) AS NextRenwalDate,

PM.ServiceTax,

PD.PaymentAmount,

PM.PlanAmount,

PM.ServicetaxAmount,


CONVERT(varchar(10), PD.CreateDate, 105) AS CreateDate

from MemberRegistration MR

inner join PaymentDetails PD on MR.MemberId = PD.MemberID

INNER JOIN SchemeMaster SM ON MR.SchemeID = sm.SchemeID

INNER JOIN PlanMaster PM ON MR.PlanID = PM.PlanID

where PD.PaymentID =@PaymentID

end




/****** Object:  StoredProcedure [dbo].[sprocMemberRegistrationSelectSingleItem]    Script Date: 12/28/2019 AM 09:25:38 ******/
SET ANSI_NULLS ON

GO
/****** Object:  StoredProcedure [dbo].[sprocMemberRegistrationDeleteSingleItem]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sprocMemberRegistrationDeleteSingleItem]      

(      

 @MemberId bigint      

)      

AS      

BEGIN


DELETE FROM [MemberRegistration]

WHERE MemberID = @MemberId


DELETE FROM PaymentDetails

WHERE MemberID = @MemberId

END


GO
/****** Object:  StoredProcedure [dbo].[sprocMemberRegistrationInsertUpdateSingleItem]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create    

 PROCEDURE [dbo].[sprocMemberRegistrationInsertUpdateSingleItem] (    

  @MemberId BIGINT = 0    

 ,@MemberFName NVARCHAR(100) = NULL    

 ,@MemberLName NVARCHAR(100) = NULL    

 ,@MemberMName NVARCHAR(100) = NULL    

 ,@Address NVARCHAR(500) = NULL    

 ,@DOB DATETIME    

 ,@Age NVARCHAR(10) = NULL    

 ,@Contactno NVARCHAR(10) = NULL    

 ,@EmailID NVARCHAR(30) = NULL    

 ,@Gender NVARCHAR(30) = NULL    

 ,@PlanID INT = 0    

 ,@SchemeID INT = 0    

 ,@Createdby BIGINT = 0    

 ,@ModifiedBy BIGINT = 0    

 ,@JoiningDate DATETIME    

 ,@MemIDOUT int out    

 )    

AS    

DECLARE @ReturnValue INT    

    

IF (@MemberId = 0) -- New Item                    

BEGIN    

 DECLARE @MemberNo VARCHAR(20)    

 DECLARE @MainMemberID VARCHAR(20)    

 DECLARE @tables TABLE (    

  MemberNo VARCHAR(20)    

  ,Memnumber VARCHAR(20)    

  )    

    

 INSERT INTO @tables    

 EXEC Usp_Generatenumber    

    

 SELECT @MemberNo = MemberNo    

  ,@MainMemberID = Memnumber    

 FROM @tables    

    

 INSERT INTO [MemberRegistration] (    

  MemberFName    

  ,MemberLName    

  ,MemberMName    

  ,DOB    

  ,Age    

  ,Contactno    

  ,EmailID    

  ,Gender    

  ,PlanID    

  ,SchemeID    

  ,Createdby    

  ,CreatedDate    

  ,ModifiedBy    

  ,JoiningDate    

  ,Address    

  ,MainMemberID    

  ,MemberNo    

  )    

 VALUES (    

  @MemberFName    

  ,@MemberLName    

  ,@MemberMName    

  ,@DOB    

  ,@Age    

  ,@Contactno    

  ,@EmailID    

  ,@Gender    

  ,@PlanID

  ,@SchemeID    

  ,@Createdby    

  ,GETDATE()    

  ,@ModifiedBy    

  ,CONVERT(date,@JoiningDate,103)    

  ,@Address    

  ,@MainMemberID    

  ,@MemberNo    

  )    

    

 SELECT @ReturnValue = SCOPE_IDENTITY()    

 set @MemIDOUT =SCOPE_IDENTITY()    

END    

ELSE    

BEGIN    

 UPDATE [MemberRegistration]    

 SET MemberFName = @MemberFName    

  ,MemberLName = @MemberLName    

  ,MemberMName = @MemberMName    

  ,DOB = @DOB    

  ,Age = @Age    

  ,Contactno = @Contactno    

  ,EmailID = @EmailID    

  ,Gender = @Gender    

  ,Createdby = @Createdby    

  ,ModifiedBy = @ModifiedBy    

  ,Address = @Address    

 WHERE MemberRegistration.MemberId = @MemberId    

   
 SELECT @ReturnValue = @MemberId    
  set @MemIDOUT =@MemberId    

  

END    

    

IF (@@ERROR != 0)    

BEGIN    

 RETURN - 1    

END    

ELSE    

BEGIN    

 RETURN @ReturnValue    

     

END




GO
/****** Object:  StoredProcedure [dbo].[sprocMemberRegistrationSelectList]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sprocMemberRegistrationSelectList]    



AS    



BEGIN    



    



 SET NOCOUNT ON    



 DECLARE @Err int    



    



 SELECT    



  MemberRegistration.MemberId    



,MemberRegistration.MemberNo    



,MemberFName    



,MemberLName    



,MemberMName    



,Upper(MemberLName) +' '+Upper(MemberFName) +' '+Upper(MemberMName)  as  MemberName  



,DOB    



,Age    



,Contactno    



,EmailID    



,Gender    



,PM.PlanName



,SM.SchemeName  

 

,ModifiedDate    



,ModifiedBy    



,MemImagename    



,MemImagePath    



,Convert(varchar(10),JoiningDate,103)  as JoiningDate



 FROM [MemberRegistration]  



 Inner Join PlanMaster PM on PM.PlanID = MemberRegistration.PlanID 

 Inner Join SchemeMaster SM on SM.SchemeID =MemberRegistration.SchemeID 

    



 SET @Err = @@Error    



    



 RETURN @Err    



END






GO
/****** Object:  StoredProcedure [dbo].[sprocMemberRegistrationSelectSingleItem]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sprocMemberRegistrationSelectSingleItem] (@MemberId BIGINT)
AS
BEGIN
	SET NOCOUNT ON

	DECLARE @Err INT

	SELECT TOP 1 MR.MemberId
		,MR.MemberNo s
		,MR.MemberFName
		,MR.MemberLName
		,MR.MemberMName
		,CONVERT(DATE, DOB, 103) AS DOB
		,Age
		,Contactno
		,EmailID
		,COnvert(INT, Gender) AS Gender
		,MR.PlanID
		,MR.SchemeID
		,MR.Createdby
		,MR.CreatedDate
		,ModifiedDate
		,MR.ModifiedBy
		,MemImagename
		,MemImagePath
		,CONVERT(DATE, JoiningDate, 103) AS JoiningDate
		,pd.PaymentAmount AS Amount
		,Address
		,pd.PaymentID
		,SM.SchemeName
		,PM.PlanName
	FROM [MemberRegistration] MR
	INNER JOIN PaymentDetails pd ON MR.MemberId = pd.MemberID
	INNER JOIN SchemeMaster SM ON MR.SchemeID = sm.SchemeID
	INNER JOIN PlanMaster PM ON MR.PlanID = PM.PlanID
	WHERE (MR.MemberId = @MemberId)
	ORDER BY pd.PaymentID DESC

	SET @Err = @@Error

	RETURN @Err
END



GO
/****** Object:  StoredProcedure [dbo].[sprocPaymentDetailsInsertUpdateSingleItem]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sprocPaymentDetailsInsertUpdateSingleItem] (
	@PaymentID BIGINT = 0
	,@PlanID INT = NULL
	,@WorkouttypeID INT = NULL
	,@Paymenttype NVARCHAR(50) = NULL
	,@PaymentFromdt DATETIME = NULL
	,@PaymentAmount NUMERIC(18, 0) = NULL
	,@CreateUserID INT = NULL
	,@ModifyUserID INT = NULL
	,@RecStatus CHAR(1) = NULL
	,@MemberID BIGINT = NULL
	,@PaymentIDOUT INT OUTPUT
	)
AS
DECLARE @ReturnValue INT
DECLARE @period INT
DECLARE @PaymentTodt DATETIME
DECLARE @tempdate DATETIME
DECLARE @NextRenwalDate DATETIME

IF (@PaymentID = 0) -- New Item    
BEGIN
	SET @period = (
			SELECT PeriodID
			FROM PlanMaster
			WHERE PlanID = @PlanID
			)
	SET @tempdate = @PaymentFromdt
	SET @PaymentTodt = DATEADD(mm, @period, @PaymentFromdt)
	SET @NextRenwalDate = DATEADD(mm, @period, @PaymentFromdt)

	INSERT INTO [PaymentDetails] (
		PlanID
		,WorkouttypeID
		,Paymenttype
		,PaymentFromdt
		,PaymentTodt
		,PaymentAmount
		,NextRenwalDate
		,CreateDate
		,Createdby
		,ModifyDate
		,ModifiedBy
		,RecStatus
		,MemberID
		,MemberNo
		)
	VALUES (
		@PlanID
		,@WorkouttypeID
		,@Paymenttype
		,@PaymentFromdt
		,@PaymentTodt
		,@PaymentAmount
		,@NextRenwalDate
		,GETDATE()
		,@CreateUserID
		,NULL
		,@ModifyUserID
		,@RecStatus
		,@MemberID
		,NULL
		)

	SELECT @ReturnValue = SCOPE_IDENTITY()

	SET @PaymentIDOUT = SCOPE_IDENTITY()
END

IF (@@ERROR != 0)
BEGIN
	RETURN - 1
END
ELSE
BEGIN
	RETURN @ReturnValue
END



GO
/****** Object:  StoredProcedure [dbo].[sprocPlanMasterInsertUpdateSingleItem]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sprocPlanMasterInsertUpdateSingleItem] (
	@PlanID INT = 0
	,@SchemeID INT = 0
	,@PeriodID INT = 0
	,@PlanName VARCHAR(50) = NULL
	,@PlanAmount DECIMAL(18, 2) = NULL
	,@ServiceTax DECIMAL(18, 2) = NULL
	,@CreateUserID INT = 0
	,@ModifyUserID INT = 0
	,@RecStatus CHAR(1) = NULL
	)
AS
DECLARE @ReturnValue INT
DECLARE @servicetaxAM DECIMAL(18, 2) = 12.36

IF (@PlanID = 0) -- New Item          
BEGIN
	DECLARE @tax DECIMAL(18, 0)

	SET @tax = @PlanAmount * @ServiceTax
	SET @servicetaxAM = @tax / 100

	DECLARE @totalamt DECIMAL(18, 0)

	SET @totalamt = @PlanAmount + @servicetaxAM

	INSERT INTO [PlanMaster] (
		PlanName
		,PlanAmount
		,ServiceTax
		,CreateDate
		,CreateUserID
		,ModifyDate
		,ModifyUserID
		,RecStatus
		,SchemeID
		,PeriodID
		,TotalAmount
		,ServicetaxAmount
		)
	VALUES (
		@PlanName
		,@PlanAmount
		,'14.00'
		,GETDATE()
		,@CreateUserID
		,GETDATE()
		,@ModifyUserID
		,@RecStatus
		,@SchemeID
		,@PeriodID
		,@totalamt
		,@servicetaxAM
		)

	SELECT @ReturnValue = SCOPE_IDENTITY()
END
ELSE
BEGIN
	UPDATE [PlanMaster]
	SET PlanName = @PlanName
		,PlanAmount = @PlanAmount
		,ServiceTax = @ServiceTax
		,CreateDate = GETDATE()
		,CreateUserID = @CreateUserID
		,ModifyDate = GETDATE()
		,ModifyUserID = @ModifyUserID
		,RecStatus = @RecStatus
		,SchemeID = @SchemeID
		,PeriodID = @PeriodID
	WHERE [PlanID] = @PlanID

	SELECT @ReturnValue = @PlanID
END

IF (@@ERROR != 0)
BEGIN
	RETURN - 1
END
ELSE
BEGIN
	RETURN @ReturnValue
END





/****** Object:  StoredProcedure [dbo].[Usp_GetAllRenwalrecords]    Script Date: 12/28/2019 AM 09:30:01 ******/
SET ANSI_NULLS ON

GO
/****** Object:  StoredProcedure [dbo].[Usp_Generatenumber]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Usp_Generatenumber]        

        

as        

        

begin        

        

BEGIN TRANSACTION        

        

Declare @Memnum nvarchar(4)        

Declare @Name nvarchar(6)        

Declare @MemberNo nvarchar(20)        

Declare @Year nvarchar(4)        

set @Year = (select Year FROM Fiscalyear where GETDATE() BETWEEN FiscalyearFromDate AND FiscalyearToDate)        

set @Name = 'GYMONE'        

set @Memnum = (SELECT Isnull(max(MainMemberID),0) FROM MemberRegistration WITH(HOLDLOCK))              

if(@Memnum = 0)        

begin             

set @MemberNo = @Name+'/'+'1'+'/'+@Year   

set @Memnum = 1     

end        

else        

begin        

set @Memnum = (SELECT (max(MainMemberID )+ 1) FROM MemberRegistration WITH(HOLDLOCK))        

set @MemberNo = @Name+'/'+@Memnum+'/'+@Year        

end        

COMMIT TRANSACTION        

        

select @MemberNo as MemberNo  ,@Memnum as Memnumber      

        

end

GO
/****** Object:  StoredProcedure [dbo].[Usp_GetAllRenwalrecords]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [dbo].[Usp_GetAllRenwalrecords]            

         

as            

            

begin            

            

SELECT             

 m.MemberFName + ' | ' + m.MemberLName  AS Name  ,       

 m.Address,      

 m.Contactno,      

 m.EmailID,           

 m.MemberNo,            

 PM.PlanName,            

 SM.SchemeName,            

 CONVERT(varchar, PD.PaymentFromdt, 103) AS JoiningDate,            

 CONVERT(varchar, PD.PaymentTodt, 103) AS RenwalDate,            

 PD.PaymentAmount      

FROM PaymentDetails PD            

INNER JOIN PlanMaster PM            

 ON PD.PlanID = PM.PlanID            

 INNER JOIN SchemeMaster SM on  PD.WorkouttypeID = SM.SchemeID            

 INNER JOIN MemberRegistration m  ON PD.MemberID = m.MainMemberID       

 where PD.PaymentTodt in (SELECT MAX(PaymentTodt) from PaymentDetails group BY MemberID)      

 order BY PD.PaymentID desc        

            

end




	

GO
/****** Object:  StoredProcedure [dbo].[Usp_GetAllRenwalrecordsFromBetweenDate]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [dbo].[Usp_GetAllRenwalrecordsFromBetweenDate]              

     @Paymentfromdt datetime = null,      

     @Paymenttodt datetime = null,

     @exactdate  datetime = null    

as              

              

begin

 

     

  IF(@Paymentfromdt is not null and @Paymenttodt is not null)

  begin



SELECT

	m.MemberID,

	PaymentID,

	m.MemberFName + ' | ' + m.MemberLName AS Name,

	m.Address,

	m.Contactno,

	m.EmailID,

	m.MemberNo,

	PM.PlanName,

	SM.SchemeName,

	CONVERT(varchar, PD.PaymentFromdt, 103) AS JoiningDate,

	CONVERT(varchar, PD.PaymentTodt, 103) AS RenwalDate,

	PD.PaymentAmount,

	PD.WorkouttypeID,

	PD.PlanID AS PlantypeID

FROM PaymentDetails PD

INNER JOIN PlanMaster PM

	ON PD.PlanID = PM.PlanID

INNER JOIN SchemeMaster SM

	ON PD.WorkouttypeID = SM.SchemeID

INNER JOIN MemberRegistration m

	ON PD.MemberID = m.MemberID

WHERE CONVERT(varchar(10), PaymentTodt, 126) IN (SELECT

	CONVERT(varchar(10), MAX(PaymentTodt), 126)

FROM PaymentDetails



WHERE CONVERT(varchar(10), PaymentTodt, 126) BETWEEN CONVERT(varchar(10), @Paymentfromdt, 126) AND

CASE

	WHEN @Paymenttodt = '1990-01-01 00:00:00.000' THEN CONVERT(varchar(10), GETDATE(), 126)

	 ELSE CONVERT(varchar(10), @Paymenttodt, 126) 

END

GROUP BY MemberID)

ORDER BY PD.PaymentID DESC

      

      end

      

      else

      

      begin

SELECT

	M.MemberID,

	PaymentID,

	m.MemberFName + ' | ' + m.MemberLName AS Name,

	m.Address,

	m.Contactno,

	m.EmailID,

	PD.MemberNo,

	PM.PlanName,

	SM.SchemeName,

	CONVERT(varchar, PD.PaymentFromdt, 103) AS JoiningDate,

	CONVERT(varchar, PD.PaymentTodt, 103) AS RenwalDate,

	PD.PaymentAmount,

	PD.WorkouttypeID,

	PD.PlanID AS PlantypeID

FROM PaymentDetails PD

INNER JOIN PlanMaster PM

	ON PD.PlanID = PM.PlanID

INNER JOIN SchemeMaster SM

	ON PD.WorkouttypeID = SM.SchemeID

INNER JOIN MemberRegistration m

	ON PD.MemberID = m.MemberID

WHERE CONVERT(varchar(10), PaymentTodt, 126) IN (SELECT

	CONVERT(varchar(10), MAX(PaymentTodt), 126)

FROM PaymentDetails

WHERE CONVERT(varchar(10), PaymentTodt, 126) = @exactdate



GROUP BY MemberID)

ORDER BY PD.PaymentID DESC

      

      end

          

              

end




GO
/****** Object:  StoredProcedure [dbo].[Usp_GetAmount_reg]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [dbo].[Usp_GetAmount_reg]

@PlanID int,

@SchemeID int

as

begin

SELECT TotalAmount FROM PlanMaster where PlanID =@PlanID and SchemeID=@SchemeID

end




GO
/****** Object:  StoredProcedure [dbo].[Usp_GetMonthwisepaymentdetails]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[Usp_GetMonthwisepaymentdetails]       
	@month BIGINT
AS
BEGIN
	DECLARE @Year NVARCHAR(4)

	SET @Year = DATEPART(YEAR, GETDATE())

	DECLARE @total BIGINT

	SET @total = (
			SELECT SUM(PaymentAmount) AS Total
			FROM PaymentDetails p
			WHERE DATEPART(MM, CreateDate) = @month
				AND DATEPART(YEAR, CreateDate) = @Year
			)

	SELECT m.MemberFName
		,m.MemberNo
		,m.MemberLName
		,m.MemberMName
		,CONVERT(VARCHAR, p.CreateDate, 103) AS CreateDate
		,@total AS Total
		,DATENAME(MM, p.CreateDate) AS Paymentmonth
		,p.PaymentAmount
		,AL.Username
	FROM PaymentDetails p
	INNER JOIN MemberRegistration m ON m.MemberId = p.MemberID
	INNER JOIN Users AL ON AL.UserId = p.Createdby
	WHERE DATEPART(MM, p.CreateDate) = @month
		AND DATEPART(YEAR, p.CreateDate) = @Year
END



GO
/****** Object:  StoredProcedure [dbo].[Usp_GetYearwisepaymentdetails]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [dbo].[Usp_GetYearwisepaymentdetails]         
--exec Usp_GetYearwisepaymentdetails 2014        
@year bigint        
as        
        
begin  
        
        
declare @leap char(3)  
declare @totalsum numeric(18,2)  
  
declare @mm bigint  
declare @year1 bigint  
  
SET @mm = (SELECT  
 DATEPART(MM, GETDATE()))  
  
if(@mm = 1)  
begin  
SET @year1 = @year + 1  
  
  
end  
  
  
  
SET @leap = (SELECT  
 CASE  
  WHEN (@YEAR % 4 = 0 AND @YEAR % 100 <> 0) OR @YEAR % 400 = 0 THEN 'YES' ELSE 'NO'  
 END AS LeapYear)  
  
declare @mainsum4 numeric(19,2)  
declare @mainsum5 numeric(19,2)  
declare @mainsum6 numeric(19,2)  
declare @mainsum7 numeric(19,2)  
declare @mainsum8 numeric(19,2)  
declare @mainsum9 numeric(19,2)  
declare @mainsum10 numeric(19,2)  
declare @mainsum11 numeric(19,2)  
declare @mainsum12 numeric(19,2)  
declare @mainsum3 numeric(19,2)  
declare @mainsum2 numeric(19,2)  
declare @mainsum1 numeric(19,2)  
       
Declare @total bigint  
  
SET @mainsum4 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126)  
BETWEEN (CONVERT(varchar, @year) + '-04-01') AND (CONVERT(varchar, @year) + '-04-30')  
AND DATEPART(yyyy, M.CreateDate) = @year)  
  
  
SET @mainsum5 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126) BETWEEN (CONVERT(varchar, @year) + '-05-01') AND (CONVERT(varchar, @year) + '-05-31')  
AND DATEPART(yyyy, M.CreateDate) = @year) ---may  
  
  
SET @mainsum6 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126) BETWEEN (CONVERT(varchar, @year) + '-06-01') AND (CONVERT(varchar, @year) + '-06-30')  
AND DATEPART(yyyy, M.CreateDate) = @year) ---may  
  
SET @mainsum7 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126) BETWEEN (CONVERT(varchar, @year) + '-07-01') AND (CONVERT(varchar, @year) + '-07-31')  
AND DATEPART(yyyy, M.CreateDate) = @year) ---may  
  
SET @mainsum8 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126) BETWEEN (CONVERT(varchar, @year) + '-08-01') AND (CONVERT(varchar, @year) + '-08-31')  
AND DATEPART(yyyy, M.CreateDate) = @year) ---may  
  
SET @mainsum9 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126) BETWEEN (CONVERT(varchar, @year) + '-09-01') AND (CONVERT(varchar, @year) + '-09-30')  
AND DATEPART(yyyy, M.CreateDate) = @year) ---may  
  
SET @mainsum10 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126) BETWEEN (CONVERT(varchar, @year) + '-10-01') AND (CONVERT(varchar, @year) + '-10-31')  
AND DATEPART(yyyy, M.CreateDate) = @year) ---may  
  
SET @mainsum11 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126) BETWEEN (CONVERT(varchar, @year) + '-11-01') AND (CONVERT(varchar, @year) + '-11-30')  
AND DATEPART(yyyy, M.CreateDate) = @year) ---may  
  
SET @mainsum12 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126) BETWEEN (CONVERT(varchar, @year) + '-12-01') AND (CONVERT(varchar, @year) + '-12-31')  
AND DATEPART(yyyy, M.CreateDate) = @year) ---may  
  
SET @mainsum3 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126) BETWEEN (CONVERT(varchar, @year1) + '-01-01') AND (CONVERT(varchar, @year1) + '-01-31')  
AND DATEPART(yyyy, M.CreateDate) = @year1)  
 ---may  
  
   
   
  
if(@leap ='NO')  
begin  
SET @mainsum2 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126) BETWEEN (CONVERT(varchar, @year1) + '-02-01') AND (CONVERT(varchar, @year1) + '-02-28')  
AND DATEPART(yyyy, M.CreateDate) = @year1)  
 ---may  
end  
  
if(@leap ='YES')  
begin  
SET @mainsum2 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126) BETWEEN (CONVERT(varchar, @year1) + '-02-01') AND (CONVERT(varchar, @year1) + '-02-29')  
AND DATEPART(yyyy, M.CreateDate) = @year1)  
 ---may  
end  
  
  
SET @mainsum1 = (SELECT  
 SUM(PaymentAmount) AS Total  
FROM PaymentDetails M  
WHERE CONVERT(varchar(10), M.CreateDate, 126) BETWEEN (CONVERT(varchar, @year1) + '-03-01') AND (CONVERT(varchar, @year1) + '-03-31')  
AND DATEPART(yyyy, M.CreateDate) = @year1) ---may  
  
  
SET @totalsum = (ISNULL(@mainsum4, 0) +  
ISNULL(@mainsum5, 0) +  
ISNULL(@mainsum6, 0) +  
ISNULL(@mainsum7, 0) +  
ISNULL(@mainsum8, 0) +  
ISNULL(@mainsum9, 0) +  
ISNULL(@mainsum10, 0) +  
ISNULL(@mainsum11, 0) +  
ISNULL(@mainsum12, 0) +  
ISNULL(@mainsum1, 0) +  
ISNULL(@mainsum2, 0) +  
ISNULL(@mainsum3, 0))  
  
SELECT  
 CONVERT(varchar, @year + 1) AS CurrentYear,  
 @mainsum4 AS april,  
 @mainsum5 AS may,  
 @mainsum6 AS june,  
 @mainsum7 AS july,  
 @mainsum8 AS august,  
 @mainsum9 AS sept,  
 @mainsum10 AS oct,  
 @mainsum11 AS nov,  
 @mainsum12 AS Decm,  
 @mainsum3 AS jan,  
 @mainsum2 AS feb,  
 @mainsum1 AS march,  
 @totalsum AS Total  
  
end



GO
/****** Object:  StoredProcedure [dbo].[Usp_UpdateMemberDetails]    Script Date: 01/20/2019 AM 10:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [dbo].[Usp_UpdateMemberDetails]

  @MemberId BIGINT = 0    

 ,@MemberFName NVARCHAR(100) = NULL    

 ,@MemberLName NVARCHAR(100) = NULL    

 ,@MemberMName NVARCHAR(100) = NULL    

 ,@Address NVARCHAR(500) = NULL    

 ,@DOB DATETIME    

 ,@Age NVARCHAR(10) = NULL    

 ,@Contactno NVARCHAR(10) = NULL    

 ,@EmailID NVARCHAR(30) = NULL    

 ,@Gender NVARCHAR(30) = NULL    

 ,@ModifiedBy BIGINT = 0    

as
begin

 UPDATE [MemberRegistration]    

 SET MemberFName = @MemberFName    

  ,MemberLName = @MemberLName    

  ,MemberMName = @MemberMName    

  ,DOB = @DOB    

  ,Age = @Age    

  ,Contactno = @Contactno    

  ,EmailID = @EmailID    

  ,Gender = @Gender    

  ,ModifiedBy = @ModifiedBy    

  ,Address = @Address    

 WHERE MemberId = @MemberId    

end

GO
/*
SET IDENTITY_INSERT [dbo].[Fiscalyear] ON 

INSERT [dbo].[Fiscalyear] ([Fid], [FiscalyearFromDate], [FiscalyearToDate], [Year]) VALUES (1, CAST(N'2012-04-01 00:00:00.000' AS DateTime), CAST(N'2013-03-31 00:00:00.000' AS DateTime), N'2013')
INSERT [dbo].[Fiscalyear] ([Fid], [FiscalyearFromDate], [FiscalyearToDate], [Year]) VALUES (2, CAST(N'2013-04-01 00:00:00.000' AS DateTime), CAST(N'2014-03-31 00:00:00.000' AS DateTime), N'2014')
INSERT [dbo].[Fiscalyear] ([Fid], [FiscalyearFromDate], [FiscalyearToDate], [Year]) VALUES (3, CAST(N'2014-04-01 00:00:00.000' AS DateTime), CAST(N'2015-03-31 00:00:00.000' AS DateTime), N'2015')
INSERT [dbo].[Fiscalyear] ([Fid], [FiscalyearFromDate], [FiscalyearToDate], [Year]) VALUES (4, CAST(N'2015-04-01 00:00:00.000' AS DateTime), CAST(N'2016-03-31 00:00:00.000' AS DateTime), N'2016')
INSERT [dbo].[Fiscalyear] ([Fid], [FiscalyearFromDate], [FiscalyearToDate], [Year]) VALUES (5, CAST(N'2016-04-01 00:00:00.000' AS DateTime), CAST(N'2017-03-31 00:00:00.000' AS DateTime), N'2017')
INSERT [dbo].[Fiscalyear] ([Fid], [FiscalyearFromDate], [FiscalyearToDate], [Year]) VALUES (6, CAST(N'2017-04-01 00:00:00.000' AS DateTime), CAST(N'2019-03-31 00:00:00.000' AS DateTime), N'2019')
INSERT [dbo].[Fiscalyear] ([Fid], [FiscalyearFromDate], [FiscalyearToDate], [Year]) VALUES (7, CAST(N'2019-04-01 00:00:00.000' AS DateTime), CAST(N'2019-03-31 00:00:00.000' AS DateTime), N'2019')
INSERT [dbo].[Fiscalyear] ([Fid], [FiscalyearFromDate], [FiscalyearToDate], [Year]) VALUES (8, CAST(N'2019-04-01 00:00:00.000' AS DateTime), CAST(N'2020-03-31 00:00:00.000' AS DateTime), N'2020')
SET IDENTITY_INSERT [dbo].[Fiscalyear] OFF
*/
SET IDENTITY_INSERT [dbo].[MemberRegistration] ON 

INSERT [dbo].[MemberRegistration] ([MemberId], [MemberNo], [MemberFName], [MemberLName], [MemberMName], [DOB], [Age], [Contactno], [EmailID], [Gender], [PlanID], [SchemeID], [Createdby], [CreatedDate], [ModifiedDate], [ModifiedBy], [MemImagename], [MemImagePath], [JoiningDate], [Address], [MainMemberID]) VALUES (1, N'GYMONE/1/2019', N'Sai', N'Bag', N'Bag', CAST(N'1990-09-23 18:30:00.000' AS DateTime), N'28', N'999999999', N'demo@gmail.com', N'1', 4, 6, 2, CAST(N'2019-12-25 18:39:14.510' AS DateTime), NULL, 0, NULL, NULL, CAST(N'2019-12-25 00:00:00.000' AS DateTime), N'Mumbai', 1)
INSERT [dbo].[MemberRegistration] ([MemberId], [MemberNo], [MemberFName], [MemberLName], [MemberMName], [DOB], [Age], [Contactno], [EmailID], [Gender], [PlanID], [SchemeID], [Createdby], [CreatedDate], [ModifiedDate], [ModifiedBy], [MemImagename], [MemImagePath], [JoiningDate], [Address], [MainMemberID]) VALUES (2, N'GYMONE/2/2019', N'one', N'one', N'one', CAST(N'2000-12-20 13:10:37.000' AS DateTime), N'18', N'9999999999', N'one@gmail.com', N'1', 1, 7, 2, CAST(N'2019-12-25 18:41:17.570' AS DateTime), NULL, 0, NULL, NULL, CAST(N'2019-12-25 00:00:00.000' AS DateTime), N'mumbai', 2)
INSERT [dbo].[MemberRegistration] ([MemberId], [MemberNo], [MemberFName], [MemberLName], [MemberMName], [DOB], [Age], [Contactno], [EmailID], [Gender], [PlanID], [SchemeID], [Createdby], [CreatedDate], [ModifiedDate], [ModifiedBy], [MemImagename], [MemImagePath], [JoiningDate], [Address], [MainMemberID]) VALUES (3, N'GYMONE/3/2019', N'two', N'two', N'two', CAST(N'2000-12-13 13:11:45.000' AS DateTime), N'18', N'99999999', N'gmail.com', N'1', 3, 7, 2, CAST(N'2019-12-25 18:42:20.870' AS DateTime), NULL, 0, NULL, NULL, CAST(N'2019-12-25 00:00:00.000' AS DateTime), N'mumbai', 3)
INSERT [dbo].[MemberRegistration] ([MemberId], [MemberNo], [MemberFName], [MemberLName], [MemberMName], [DOB], [Age], [Contactno], [EmailID], [Gender], [PlanID], [SchemeID], [Createdby], [CreatedDate], [ModifiedDate], [ModifiedBy], [MemImagename], [MemImagePath], [JoiningDate], [Address], [MainMemberID]) VALUES (6, N'GYMONE/4/2019', N'demo', N'demo', N'demo', CAST(N'2001-01-01 04:43:29.000' AS DateTime), N'18', N'9999999999', N'demo@gg.com', N'1', 5, 6, 2, CAST(N'2019-12-29 10:14:03.007' AS DateTime), NULL, 0, NULL, NULL, CAST(N'2019-12-29 00:00:00.000' AS DateTime), N'Mumbai', 4)

SET IDENTITY_INSERT [dbo].[MemberRegistration] OFF
SET IDENTITY_INSERT [dbo].[PaymentDetails] ON 

INSERT [dbo].[PaymentDetails] ([PaymentID], [PlanID], [WorkouttypeID], [Paymenttype], [PaymentFromdt], [PaymentTodt], [PaymentAmount], [NextRenwalDate], [CreateDate], [Createdby], [ModifyDate], [ModifiedBy], [RecStatus], [MemberID], [MemberNo]) VALUES (1, 4, 6, N'Cash', CAST(N'2019-12-25 18:39:14.433' AS DateTime), CAST(N'2019-03-25 18:39:14.433' AS DateTime), CAST(5393 AS Numeric(18, 0)), CAST(N'2019-03-25 18:39:14.433' AS DateTime), CAST(N'2019-12-25 18:39:14.527' AS DateTime), 2, NULL, 2, N'A', 1, NULL)
INSERT [dbo].[PaymentDetails] ([PaymentID], [PlanID], [WorkouttypeID], [Paymenttype], [PaymentFromdt], [PaymentTodt], [PaymentAmount], [NextRenwalDate], [CreateDate], [Createdby], [ModifyDate], [ModifiedBy], [RecStatus], [MemberID], [MemberNo]) VALUES (2, 1, 7, N'Cash', CAST(N'2019-12-25 18:41:17.557' AS DateTime), CAST(N'2019-03-25 18:41:17.557' AS DateTime), CAST(1348 AS Numeric(18, 0)), CAST(N'2019-03-25 18:41:17.557' AS DateTime), CAST(N'2019-12-25 18:41:17.583' AS DateTime), 2, NULL, 2, N'A', 2, NULL)
INSERT [dbo].[PaymentDetails] ([PaymentID], [PlanID], [WorkouttypeID], [Paymenttype], [PaymentFromdt], [PaymentTodt], [PaymentAmount], [NextRenwalDate], [CreateDate], [Createdby], [ModifyDate], [ModifiedBy], [RecStatus], [MemberID], [MemberNo]) VALUES (3, 3, 7, N'Cash', CAST(N'2019-12-25 18:42:20.860' AS DateTime), CAST(N'2019-03-25 18:42:20.860' AS DateTime), CAST(3932 AS Numeric(18, 0)), CAST(N'2019-03-25 18:42:20.860' AS DateTime), CAST(N'2019-12-25 18:42:20.887' AS DateTime), 2, NULL, 2, N'A', 3, NULL)
INSERT [dbo].[PaymentDetails] ([PaymentID], [PlanID], [WorkouttypeID], [Paymenttype], [PaymentFromdt], [PaymentTodt], [PaymentAmount], [NextRenwalDate], [CreateDate], [Createdby], [ModifyDate], [ModifiedBy], [RecStatus], [MemberID], [MemberNo]) VALUES (5, 5, 6, N'Cash', CAST(N'2019-12-29 10:14:02.993' AS DateTime), CAST(N'2019-02-28 10:14:02.993' AS DateTime), CAST(2022 AS Numeric(18, 0)), CAST(N'2019-02-28 10:14:02.993' AS DateTime), CAST(N'2019-12-29 10:14:03.023' AS DateTime), 2, NULL, 2, N'A', 6, NULL)
INSERT [dbo].[PaymentDetails] ([PaymentID], [PlanID], [WorkouttypeID], [Paymenttype], [PaymentFromdt], [PaymentTodt], [PaymentAmount], [NextRenwalDate], [CreateDate], [Createdby], [ModifyDate], [ModifiedBy], [RecStatus], [MemberID], [MemberNo]) VALUES (8, 5, 6, N'Cash', CAST(N'2019-05-08 18:30:00.000' AS DateTime), CAST(N'2019-07-08 18:30:00.000' AS DateTime), CAST(2022 AS Numeric(18, 0)), CAST(N'2019-07-08 18:30:00.000' AS DateTime), CAST(N'2019-12-29 10:26:10.507' AS DateTime), 2, NULL, 2, N'A', 6, NULL)
INSERT [dbo].[PaymentDetails] ([PaymentID], [PlanID], [WorkouttypeID], [Paymenttype], [PaymentFromdt], [PaymentTodt], [PaymentAmount], [NextRenwalDate], [CreateDate], [Createdby], [ModifyDate], [ModifiedBy], [RecStatus], [MemberID], [MemberNo]) VALUES (9, 1, 7, N'Cash', CAST(N'2019-01-18 10:16:31.520' AS DateTime), CAST(N'2019-04-18 10:16:31.520' AS DateTime), CAST(1348 AS Numeric(18, 0)), CAST(N'2019-04-18 10:16:31.520' AS DateTime), CAST(N'2019-01-18 10:16:31.643' AS DateTime), 2, NULL, 2, N'A', 7, NULL)
SET IDENTITY_INSERT [dbo].[PaymentDetails] OFF
SET IDENTITY_INSERT [dbo].[PeriodTB] ON 

INSERT [dbo].[PeriodTB] ([PeriodID], [Text], [Value]) VALUES (1, N'3 Month', N'3')
INSERT [dbo].[PeriodTB] ([PeriodID], [Text], [Value]) VALUES (2, N'6 Month', N'6')
INSERT [dbo].[PeriodTB] ([PeriodID], [Text], [Value]) VALUES (3, N'1 Year', N'12')
SET IDENTITY_INSERT [dbo].[PeriodTB] OFF
SET IDENTITY_INSERT [dbo].[PlanMaster] ON 

INSERT [dbo].[PlanMaster] ([PlanID], [PlanName], [PlanAmount], [ServicetaxAmount], [ServiceTax], [CreateDate], [CreateUserID], [ModifyDate], [ModifyUserID], [RecStatus], [SchemeID], [PeriodID], [TotalAmount], [ServicetaxNo]) VALUES (1, N'Quaretly', CAST(1200 AS Decimal(18, 0)), CAST(148 AS Decimal(18, 0)), N'12.36', CAST(N'2015-08-02 12:07:26.843' AS DateTime), 2, CAST(N'2015-08-02 00:00:00.000' AS DateTime), 0, 1, 7, 3, CAST(1348 AS Decimal(18, 0)), N'BHCPM6927JSD001')
INSERT [dbo].[PlanMaster] ([PlanID], [PlanName], [PlanAmount], [ServicetaxAmount], [ServiceTax], [CreateDate], [CreateUserID], [ModifyDate], [ModifyUserID], [RecStatus], [SchemeID], [PeriodID], [TotalAmount], [ServicetaxNo]) VALUES (2, N'Half Yearly', CAST(2000 AS Decimal(18, 0)), CAST(247 AS Decimal(18, 0)), N'12.36', CAST(N'2015-08-02 12:07:29.210' AS DateTime), 2, CAST(N'2015-08-02 00:00:00.000' AS DateTime), 0, 1, 7, 2, CAST(2247 AS Decimal(18, 0)), N'BHCPM6927JSD001')
INSERT [dbo].[PlanMaster] ([PlanID], [PlanName], [PlanAmount], [ServicetaxAmount], [ServiceTax], [CreateDate], [CreateUserID], [ModifyDate], [ModifyUserID], [RecStatus], [SchemeID], [PeriodID], [TotalAmount], [ServicetaxNo]) VALUES (3, N'Yearly', CAST(3500 AS Decimal(18, 0)), CAST(432 AS Decimal(18, 0)), N'12.36', CAST(N'2014-05-30 22:09:40.500' AS DateTime), 1, CAST(N'2014-05-30 22:09:40.500' AS DateTime), 0, 1, 7, 3, CAST(3932 AS Decimal(18, 0)), N'BHCPM6927JSD001')
INSERT [dbo].[PlanMaster] ([PlanID], [PlanName], [PlanAmount], [ServicetaxAmount], [ServiceTax], [CreateDate], [CreateUserID], [ModifyDate], [ModifyUserID], [RecStatus], [SchemeID], [PeriodID], [TotalAmount], [ServicetaxNo]) VALUES (4, N'Yearly', CAST(4800 AS Decimal(18, 0)), CAST(593 AS Decimal(18, 0)), N'12.36', CAST(N'2014-05-30 22:09:40.500' AS DateTime), 1, CAST(N'2014-05-30 22:09:40.500' AS DateTime), 0, 1, 6, 3, CAST(5393 AS Decimal(18, 0)), N'BHCPM6927JSD001')
INSERT [dbo].[PlanMaster] ([PlanID], [PlanName], [PlanAmount], [ServicetaxAmount], [ServiceTax], [CreateDate], [CreateUserID], [ModifyDate], [ModifyUserID], [RecStatus], [SchemeID], [PeriodID], [TotalAmount], [ServicetaxNo]) VALUES (5, N'Quaretly', CAST(1800 AS Decimal(18, 0)), CAST(222 AS Decimal(18, 0)), N'12.36', CAST(N'2014-05-30 22:09:40.500' AS DateTime), 1, CAST(N'2014-05-30 22:09:40.500' AS DateTime), 0, 1, 6, 2, CAST(2022 AS Decimal(18, 0)), N'BHCPM6927JSD001')
INSERT [dbo].[PlanMaster] ([PlanID], [PlanName], [PlanAmount], [ServicetaxAmount], [ServiceTax], [CreateDate], [CreateUserID], [ModifyDate], [ModifyUserID], [RecStatus], [SchemeID], [PeriodID], [TotalAmount], [ServicetaxNo]) VALUES (6, N'Half Yearly', CAST(3000 AS Decimal(18, 0)), CAST(370 AS Decimal(18, 0)), N'12.36', CAST(N'2014-05-30 22:09:40.500' AS DateTime), 1, CAST(N'2014-05-30 22:09:40.500' AS DateTime), 0, 1, 6, 2, CAST(3370 AS Decimal(18, 0)), N'BHCPM6927JSD001')
INSERT [dbo].[PlanMaster] ([PlanID], [PlanName], [PlanAmount], [ServicetaxAmount], [ServiceTax], [CreateDate], [CreateUserID], [ModifyDate], [ModifyUserID], [RecStatus], [SchemeID], [PeriodID], [TotalAmount], [ServicetaxNo]) VALUES (7, N'policeMonthly', CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), N'12.36', CAST(N'2014-05-30 22:09:40.500' AS DateTime), 6, CAST(N'2014-05-30 22:09:40.500' AS DateTime), 0, 1, 6, 3, CAST(0 AS Decimal(18, 0)), N'BHCPM6927JSD001')
INSERT [dbo].[PlanMaster] ([PlanID], [PlanName], [PlanAmount], [ServicetaxAmount], [ServiceTax], [CreateDate], [CreateUserID], [ModifyDate], [ModifyUserID], [RecStatus], [SchemeID], [PeriodID], [TotalAmount], [ServicetaxNo]) VALUES (8, N'policehalfyearly', CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), N'12.36', CAST(N'2014-05-30 22:09:40.500' AS DateTime), 6, CAST(N'2014-05-30 22:09:40.500' AS DateTime), 0, 1, 6, 2, CAST(0 AS Decimal(18, 0)), N'BHCPM6927JSD001')
INSERT [dbo].[PlanMaster] ([PlanID], [PlanName], [PlanAmount], [ServicetaxAmount], [ServiceTax], [CreateDate], [CreateUserID], [ModifyDate], [ModifyUserID], [RecStatus], [SchemeID], [PeriodID], [TotalAmount], [ServicetaxNo]) VALUES (9, N'policeyearly', CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), N'12.36', CAST(N'2014-05-30 22:09:40.500' AS DateTime), 6, CAST(N'2014-05-30 22:09:40.500' AS DateTime), 0, 1, 6, 3, CAST(0 AS Decimal(18, 0)), N'BHCPM6927JSD001')
INSERT [dbo].[PlanMaster] ([PlanID], [PlanName], [PlanAmount], [ServicetaxAmount], [ServiceTax], [CreateDate], [CreateUserID], [ModifyDate], [ModifyUserID], [RecStatus], [SchemeID], [PeriodID], [TotalAmount], [ServicetaxNo]) VALUES (11, N'MenSpecial', CAST(5000 AS Decimal(18, 0)), CAST(1000 AS Decimal(18, 0)), N'14.00', CAST(N'2019-11-29 23:27:05.210' AS DateTime), 1, CAST(N'2019-11-29 23:27:05.210' AS DateTime), NULL, 1, 12, 1, CAST(6000 AS Decimal(18, 0)), NULL)
INSERT [dbo].[PlanMaster] ([PlanID], [PlanName], [PlanAmount], [ServicetaxAmount], [ServiceTax], [CreateDate], [CreateUserID], [ModifyDate], [ModifyUserID], [RecStatus], [SchemeID], [PeriodID], [TotalAmount], [ServicetaxNo]) VALUES (13, N'ServicetaxAmount', CAST(6000 AS Decimal(18, 0)), CAST(2500 AS Decimal(18, 0)), N'14.00', CAST(N'2019-12-25 16:17:55.043' AS DateTime), 1, CAST(N'2019-12-25 16:17:55.043' AS DateTime), NULL, 1, 6, 1, CAST(7500 AS Decimal(18, 0)), NULL)
SET IDENTITY_INSERT [dbo].[PlanMaster] OFF
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([RoleId], [RoleName], [Status]) VALUES (1, N'Admin', 1)
INSERT [dbo].[Role] ([RoleId], [RoleName], [Status]) VALUES (2, N'User', 1)
SET IDENTITY_INSERT [dbo].[Role] OFF
SET IDENTITY_INSERT [dbo].[SchemeMaster] ON 

INSERT [dbo].[SchemeMaster] ([SchemeID], [SchemeName], [Createdby], [Createddate], [Status]) VALUES (6, N'CARDIO1', 0, CAST(N'2015-07-31 09:32:38.300' AS DateTime), 1)
INSERT [dbo].[SchemeMaster] ([SchemeID], [SchemeName], [Createdby], [Createddate], [Status]) VALUES (7, N'GYM', 1, CAST(N'2014-04-20 00:00:00.000' AS DateTime), 1)
INSERT [dbo].[SchemeMaster] ([SchemeID], [SchemeName], [Createdby], [Createddate], [Status]) VALUES (12, N'Cardio', 0, CAST(N'2019-11-24 16:57:43.380' AS DateTime), 1)
INSERT [dbo].[SchemeMaster] ([SchemeID], [SchemeName], [Createdby], [Createddate], [Status]) VALUES (18, N'Test', 0, CAST(N'2019-12-25 16:58:29.697' AS DateTime), 1)
INSERT [dbo].[SchemeMaster] ([SchemeID], [SchemeName], [Createdby], [Createddate], [Status]) VALUES (22, N'pro', 1, CAST(N'2019-12-25 18:12:59.050' AS DateTime), 0)
SET IDENTITY_INSERT [dbo].[SchemeMaster] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserId], [UserName], [FullName], [EmailId], [Contactno], [Password], [Createdby], [CreatedDate], [Status]) VALUES (2, N'User', N'User', N'User@gmail.com', N'9999999999', N'tttdoybuFsAnWJYAfwOUqg==', 1, CAST(N'2019-12-12 10:19:11.287' AS DateTime), 1)
INSERT [dbo].[Users] ([UserId], [UserName], [FullName], [EmailId], [Contactno], [Password], [Createdby], [CreatedDate], [Status]) VALUES (4, N'Demo', N'Demo', N'Demo@gmail.com', N'9998887770', N'tttdoybuFsAnWJYAfwOUqg==', 1, CAST(N'2019-12-12 10:19:11.287' AS DateTime), 1)
INSERT [dbo].[Users] ([UserId], [UserName], [FullName], [EmailId], [Contactno], [Password], [Createdby], [CreatedDate], [Status]) VALUES (5, N'Admin', N'superadmin', N'admin@gmail.com', N'9999999999', N'tttdoybuFsAnWJYAfwOUqg==', 1, CAST(N'2019-12-25 16:50:11.820' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Users] OFF
SET IDENTITY_INSERT [dbo].[UsersInRoles] ON 

INSERT [dbo].[UsersInRoles] ([UserRolesId], [UserId], [RoleId]) VALUES (3, 1, 1)
INSERT [dbo].[UsersInRoles] ([UserRolesId], [UserId], [RoleId]) VALUES (4, 2, 2)
INSERT [dbo].[UsersInRoles] ([UserRolesId], [UserId], [RoleId]) VALUES (7, 5, 1)
INSERT [dbo].[UsersInRoles] ([UserRolesId], [UserId], [RoleId]) VALUES (8, 4, 2)
SET IDENTITY_INSERT [dbo].[UsersInRoles] OFF
--ALTER TABLE [dbo].[Fiscalyear] ADD  CONSTRAINT [DF_Fiscalyear_Year]  DEFAULT (NULL) FOR [Year]
GO
