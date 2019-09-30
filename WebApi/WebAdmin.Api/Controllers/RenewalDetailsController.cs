using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAdmin.Interfaces;
using WebAdmin.ViewModels;

namespace WebAdmin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RenewalDetailsController : ControllerBase
    {
        private readonly IRenewal _renewal;
        public RenewalDetailsController(IRenewal renewal)
        {
            _renewal = renewal;
        }
          
        // POST: api/RenewalDetails
        [HttpPost]
        public RenewalViewModel Post([FromBody] MemberNoRequest memberNoRequest)
        {
            var userId = Convert.ToInt32(this.User.FindFirstValue(ClaimTypes.Name));
            return _renewal.GetMemberNo(memberNoRequest.MemberNo, userId);
        }
    }
}