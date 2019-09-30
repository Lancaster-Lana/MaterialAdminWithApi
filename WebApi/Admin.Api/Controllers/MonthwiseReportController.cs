using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAdmin.Interfaces;
using WebAdmin.ViewModels;

namespace WebAdmin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MonthwiseReportController : ControllerBase
    {

        private readonly IReports _reports;
        public MonthwiseReportController(IReports reports)
        {
            _reports = reports;
        }

        // POST: api/MonthwiseReport
        [HttpPost]
        public List<MonthWiseReportViewModel> Post([FromBody] MonthwiseRequestModel value)
        {
            try
            {
                return _reports.Get_MonthwisePayment_details(value.MonthId);
            }
            catch (Exception)
            {
                throw;
            }
        }
    
    }
}
