﻿using System;
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
    //[Authorize]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRole _role;

        public RoleController(IRole role)
        {
            _role = role;
        }

        // Lis of roles
        // GET: api/Role
        [HttpGet]
        public IEnumerable<Role> Get()
        {
            try
            {
                return _role.GetAllRole();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET: api/Role/5
        [HttpGet("{id}")]
        public Role Get(int id)
        {
            try
            {
                return _role.GetRolebyId(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // POST: api/Role
        [HttpPost]
        public IActionResult Post([FromBody] RoleViewModel roleViewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (_role.CheckRoleExits(roleViewModel.RoleName))
                    {
                        return Conflict("The same role name already exists.");
                    }
                    else
                    {
                        var temprole = AutoMapper.Mapper.Map<Role>(roleViewModel);

                        _role.InsertRole(temprole);

                        return Ok();
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        // PUT: api/Role/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] RoleViewModel roleViewModel)
        {
            try
            {
                var temprole = AutoMapper.Mapper.Map<Role>(roleViewModel);
                bool result = _role.UpdateRole(temprole);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Role/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var result = _role.DeleteRole(id);

                if (result)
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                    return Ok();
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