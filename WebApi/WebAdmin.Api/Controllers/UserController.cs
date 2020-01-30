using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using WebAdmin.Common;
using WebAdmin.Interfaces;
using WebAdmin.Entities;
using WebAdmin.ViewModels;

namespace WebAdmin.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsers _users;
        public UserController(IUsers users)
        {
            _users = users;
        }
        // GET: api/User
        [HttpGet]
        public IEnumerable<Users> Get()
        {
            return _users.GetAllUsers();
        }

        // GET: api/User/5
        [HttpGet("{id}")]//, Name = "GetUsers")]
        public Users Get(int id)
        {
            return _users.GetUsersbyId(id);
        }

        // POST: api/User
        [HttpPost]
        public IActionResult Post([FromBody] UserViewModel user)
        {
            if (ModelState.IsValid)
            {
                if (_users.CheckUsersExits(user.UserName))
                {
                    return BadRequest();
                }
                else
                {
                    var userId = this.User.FindFirstValue(ClaimTypes.Name);
                    var tempUser = AutoMapper.Mapper.Map<Users>(user);
                    tempUser.CreatedDate = DateTime.Now;
                    tempUser.CreatedBy = Convert.ToInt32(userId);
                    tempUser.Password = EncryptionLibrary.EncryptText(user.Password);
                    _users.InsertUser(tempUser);

                    return Ok();
                }
            }

            return BadRequest();
        }

        // PUT: api/User/userModel
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UserViewModel user)
        {
            if (ModelState.IsValid)
            {
                user.Password = EncryptionLibrary.EncryptText(user.Password); // as we have unencrepted password

                var model = AutoMapper.Mapper.Map<Users>(user);
                model.UserId = id;
                model.CreatedDate = DateTime.Now;

                bool result =_users.UpdateUser(model);

                return Ok(result);
            }
           return BadRequest();           
       }

        // DELETE: api/Role/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _users.DeleteUsers(id);

            if (result)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}