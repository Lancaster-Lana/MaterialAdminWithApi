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
    public class MemberDetailsReportController : ControllerBase
    {
        private readonly IReports _reports;
        public MemberDetailsReportController(IReports reports)
        {
            _reports = reports;
        }

        // GET: api/MemberDetailsReport
        [HttpGet]
        public List<MemberDetailsReportViewModel> Get()
        {
            try
            {
                return _reports.Generate_AllMemberDetailsReport();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
