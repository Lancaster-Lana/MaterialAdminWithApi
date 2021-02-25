Admin web UI based on .NET Core3 and Angular 8 (with Material design framework)
To start application do the next steps:
1). Create DB and seed (migrations must be applied first, before usage web.api) 
There in VS 2017\2019 in package manager console run:
    PM> update-database -project WebAdmin.EF

(NOTE :wait until creation and Seeding of DB will be finished !
After that "AdminWebAPI_DBScript.sql" script will be applied with migration 20200613173042_SeedDB
(double check in MS SQl Management Studio 2018+ that Users database is filled : admin user, etc)

2). Lunch web api project (startup project WebAdmin.Api in VS 2017\2019) .
Swagger web api will be lunched

3) In other VS 2019 (where .NET Core3.0 installed)
open this project SPAdmin (it is 2d solution AdminUI)

To check, that angular app build ok (Angular CLI configured)
under ClientApp directory (i cmd.exe) run:
*  npm i
* 'ng build' 

====================================================
Then lunch SPAdmin project:
3.1 To login under Admin specify
    Login : Admin
    Password: 123456
3.2 To login unser user, specify
    Login : User
    Password: 123456
