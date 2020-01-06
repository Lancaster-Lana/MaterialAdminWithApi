using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAdmin.Interfaces;
using WebAdmin.Entities;

namespace WebAdmin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RemoveRoleController : ControllerBase
    {
        private readonly IUsersInRoles _usersInRoles;
        public RemoveRoleController(IUsersInRoles usersInRoles)
        {
            _usersInRoles = usersInRoles;
        }

        // POST: api/RemoveRole
        [HttpPost]
        public IActionResult Post([FromBody] UsersInRoles usersInRoles)
        {
            if (ModelState.IsValid)
            {
                if (_usersInRoles.CheckRoleExists(usersInRoles))
                {
                  
                    usersInRoles.UserRolesId = 0;
                    _usersInRoles.RemoveRole(usersInRoles);

                    return Ok();
                }
                else
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.Conflict
                    };

                    return Conflict();
                }
            }
            return BadRequest();
        }
    }
}