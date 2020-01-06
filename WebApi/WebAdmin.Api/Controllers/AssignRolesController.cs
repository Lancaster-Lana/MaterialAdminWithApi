using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAdmin.Interfaces;
using WebAdmin.Entities;
using WebAdmin.ViewModels;

namespace WebAdmin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AssignRolesController : ControllerBase
    {
        private readonly IUsersInRoles _usersInRoles;
        public AssignRolesController(IUsersInRoles usersInRoles)
        {
            _usersInRoles = usersInRoles;
        }


        // GET: api/UsersInRoles
        [HttpGet]
        public IEnumerable<AssignRolesViewModel> Get()
        {
            try
            {
                return _usersInRoles.GetAssignRoles();
            }
            catch (Exception)
            {
                throw;
            }
        }


        // POST: api/UsersInRoles
        [HttpPost]
        public IActionResult Post([FromBody] UsersInRoles usersInRoles)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (_usersInRoles.CheckRoleExists(usersInRoles))
                    {
                        return Conflict();
                    }

                    usersInRoles.UserRolesId = 0;
                    bool result = _usersInRoles.AssignRole(usersInRoles);
                    return Ok(result);
                }

                return BadRequest();

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
