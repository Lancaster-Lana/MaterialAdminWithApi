Admin web UI based on .NET Core3 and Angular 8 (with Material design framework)
To start application do the next steps:
1). Create DB and seed 
1.1* There in WebAdmin.Api run in package manager console 
PM> update-database -project WebAdmin.EF
1.2 * Then execute AdminWebAPI_DBScript (in MS SQl Management Studio)
to crete test entities (admin ,etc)

2). Lunch web api project (startup project WebAdmin.Api in VS 2017\2019) .
Swagger web api will be lunched

==================================
3) In other VS 2019 (where .NET Core3.0 installed)
open this project SPAdmin (it is 2d solution AdminUI)

To check, that angular app build ok (Angular CLI configured)
under ClientApp directory (i cmd.exe) run:
*  npm i
* 'ng build' 
Then lunch SPAdmin project:
3.1 To login under Admin specify
    Login : Admin
    Password: 123456
3.2 To login unser user, specify
    Login : User
    Password: 123456
