using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAdmin.Interfaces;
using WebAdmin.Entities;

namespace WebAdmin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SchemeDropdownController : ControllerBase
    {

        private readonly ISchemeMaster _schemeMaster;
        public SchemeDropdownController(ISchemeMaster schemeMaster)
        {
            _schemeMaster = schemeMaster;
        }

        // GET: api/SchemeDropdown
        [HttpGet]
        public IEnumerable<SchemeMaster> Get()
        {
            try
            {
                return _schemeMaster.GetActiveSchemeMasterList();
            }
            catch (Exception)
            {
                throw;
            }
        }     
    }
}
