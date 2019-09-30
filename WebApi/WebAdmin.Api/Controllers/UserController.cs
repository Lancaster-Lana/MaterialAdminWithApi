using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
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
        public HttpResponseMessage Post([FromBody] UserViewModel user)
        {
            if (ModelState.IsValid)
            {
                if (_users.CheckUsersExits(user.UserName))
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.Conflict
                    };
                    return response;
                }
                else
                {
                    var userId = this.User.FindFirstValue(ClaimTypes.Name);
                    var tempUsers = AutoMapper.Mapper.Map<Users>(user);
                    tempUsers.CreatedDate = DateTime.Now;
                    tempUsers.CreatedBy = Convert.ToInt32(userId);
                    tempUsers.Password = EncryptionLibrary.EncryptText(user.Password);
                    _users.InsertUser(tempUsers);

                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                    return response;
                }
            }
            else
            {
                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
                return response;
            }
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] UserViewModel user)
        {
            if (ModelState.IsValid)
            {
                user.Password = EncryptionLibrary.EncryptText(user.Password); // as we have unencrepted password

                var model = AutoMapper.Mapper.Map<Users>(user);
                model.UserId = id;
                model.CreatedDate = DateTime.Now;

                _users.UpdateUser(model);

                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
                return response;
            }
            else
            {
                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
                return response;
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            var result = _users.DeleteUsers(id);

            if (result)
            {
                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
                return response;
            }
            else
            {
                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
                return response;
            }
        }
    }
}