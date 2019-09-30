using System.Collections.Generic;
using WebAdmin.Entities;
using WebAdmin.ViewModels;

namespace WebAdmin.Interfaces
{
    public interface IUsers
    {
        bool InsertUser(Users user);
        bool CheckUsersExits(string username);
        Users GetUsersbyId(int userid);
        bool DeleteUsers(int userid);
        bool UpdateUser(Users user);
        List<Users> GetAllUsers();
        bool AuthenticateUsers(string username, string password);
        LoginResponse GetUserDetailsbyCredentials(string username);
    }
}