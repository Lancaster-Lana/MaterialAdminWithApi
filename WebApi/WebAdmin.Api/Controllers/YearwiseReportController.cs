﻿using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAdmin.Interfaces;
using WebAdmin.ViewModels;

namespace WebAdmin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class YearwiseReportController : ControllerBase
    {
        private readonly IReports _reports;
        public YearwiseReportController(IReports reports)
        {
            _reports = reports;
        }

        // POST: api/YearwiseReport
        [HttpPost]
        public List<YearwiseReportViewModel> Post([FromBody] YearWiseRequestModel value)
        {
            return _reports.Get_YearwisePayment_details(value.YearID);
        }
    }
}
