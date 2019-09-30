using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebAdmin.Interfaces;
using WebAdmin.Entities;

namespace WebAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeriodController : ControllerBase
    {
        private readonly IPeriodMaster _periodMaster;
        public PeriodController(IPeriodMaster periodMaster)
        {
            _periodMaster = periodMaster;
        }

        // GET: api/Period
        [HttpGet]
        public IEnumerable<PeriodTB> Get()
        {
            try
            {
                return _periodMaster.ListofPeriod();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
