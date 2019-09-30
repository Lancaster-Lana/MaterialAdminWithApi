﻿using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAdmin.Interfaces;
using WebAdmin.ViewModels;

namespace WebAdmin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RenewalReportController : ControllerBase
    {
        private readonly IReports _reports;
        public RenewalReportController(IReports reports)
        {
            _reports = reports;
        }
      
        // POST: api/RenewalReport
        [HttpPost]
        public List<RenewalReportViewModel> Post([FromBody] RenewalReportRequestModel value)
        {
            try
            {
                return _reports.Get_RenewalReport(value);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
