using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
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
    public class SchemeController : ControllerBase
    {
        private readonly ISchemeMaster _schemeMaster;
        public SchemeController(ISchemeMaster schemeMaster)
        {
            _schemeMaster = schemeMaster;
        }

        // GET: api/Scheme
        [HttpGet]
        public List<SchemeMaster> Get()
        {
            return _schemeMaster.GetSchemeMasterList();
        }

        // GET: api/Scheme/5
        [HttpGet("{id}", Name = "GetScheme")]
        public SchemeMaster Get(int id)
        {
            return _schemeMaster.GetSchemeMasterbyId(id);
        }

        // POST: api/Scheme
        [HttpPost]
        public IActionResult Post([FromBody] SchemeMasterViewModel schemeMaster)
        {
            if (ModelState.IsValid)
            {
                if (_schemeMaster.CheckSchemeNameExists(schemeMaster.SchemeName))
                {
                    return Conflict();
                }
                else
                {
                    var userId = this.User.FindFirstValue(ClaimTypes.Name);

                    var tempSchemeMaster = AutoMapper.Mapper.Map<SchemeMaster>(schemeMaster);
                    tempSchemeMaster.CreatedDate = DateTime.Now;
                    tempSchemeMaster.CreatedBy = Convert.ToInt32(userId);
                    _schemeMaster.AddSchemeMaster(tempSchemeMaster);
                    return Ok();
                }
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT: api/Scheme/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] SchemeMasterEditViewModel schemeMaster)
        {
            if (string.IsNullOrWhiteSpace(Convert.ToString(id)) || schemeMaster == null)
            {
                return BadRequest();
            }
            else
            {
                var temp = AutoMapper.Mapper.Map<SchemeMaster>(schemeMaster);
                var result = _schemeMaster.UpdateSchemeMaster(temp);

                return Ok(result);
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _schemeMaster.DeleteScheme(id);

            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
