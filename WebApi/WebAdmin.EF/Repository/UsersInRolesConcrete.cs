using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using WebAdmin.Interfaces;
using WebAdmin.Entities;
using WebAdmin.ViewModels;

namespace WebAdmin.EF
{
    public class UsersInRolesConcrete : IUsersInRoles
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public UsersInRolesConcrete(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            _configuration = config;
        }

        public bool AssignRole(UsersInRoles usersInRoles)
        {
            _context.Add(usersInRoles);
            var result = _context.SaveChanges();
            return result > 0;
        }

        public bool CheckRoleExists(UsersInRoles usersInRoles)
        {
            var result = (from userrole in _context.UsersInRoles
                          where userrole.UserId == usersInRoles.UserId && userrole.RoleId == usersInRoles.RoleId
                          select userrole).Count();

            return result > 0;
        }

        public bool RemoveRole(UsersInRoles usersInRoles)
        {
            var role = (from userrole in _context.UsersInRoles
                        where userrole.UserId == usersInRoles.UserId && userrole.RoleId == usersInRoles.RoleId
                        select userrole).FirstOrDefault();
            if (role != null)
            {
                _context.UsersInRoles.Remove(role);
                var result = _context.SaveChanges();
                return result > 0;
            }
            else
            {
                return false;
            }
        }

        public List<AssignRolesViewModel> GetAssignRoles()
        {
            var result = (from usertb in _context.UsersInRoles
                          join role in _context.Role on usertb.RoleId equals role.RoleId
                          join user in _context.Users on usertb.UserId equals user.UserId
                          select new AssignRolesViewModel()
                          {
                              RoleName = role.RoleName,
                              RoleId = usertb.RoleId,
                              UserName = role.RoleName,
                              UserId = usertb.UserId,
                              UserRolesId = usertb.UserRolesId

                          }).ToList();

            return result;
        }
    }
}