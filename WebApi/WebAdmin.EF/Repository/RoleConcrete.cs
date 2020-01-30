using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Microsoft.Extensions.Configuration;
using WebAdmin.Interfaces;
using WebAdmin.Entities;

namespace WebAdmin.EF
{
    public class RoleConcrete : IRole
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public RoleConcrete(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public bool CheckRoleExits(string roleName)
        {
            var result = (from role in _context.Role
                          where role.RoleName == roleName
                          select role).Count();
            return result > 0;
        }

        public bool DeleteRole(int roleId)
        {
            var roledata = (from role in _context.Role
                            where role.RoleId == roleId
                            select role).FirstOrDefault();

            if (roledata != null)
            {
                _context.Role.Remove(roledata);
                var result = _context.SaveChanges();

                return result > 0;
            }
            else
            {
                return false;
            }
        }

        public Role GetRolebyId(int roleId)
        {
            var result = (from role in _context.Role
                          where role.RoleId == roleId
                          select role).FirstOrDefault();

            return result;
        }

        public List<Role> GetAllRole()
        {
            var result = (from role in _context.Role
                select role).ToList();

            return result;
        }

        public void InsertRole(Role role)
        {
            _context.Role.Add(role);
            _context.SaveChanges();
        }

        public bool UpdateRole(Role role)
        {
            _context.Entry(role).Property(x => x.Status).IsModified = true;
            _context.Entry(role).Property(x => x.RoleName).IsModified = true;
            var result = _context.SaveChanges();
            return result > 0;
        }
    }
}
