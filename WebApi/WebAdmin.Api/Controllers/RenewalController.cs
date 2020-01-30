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
    public class RenewalController : ControllerBase
    {
        private readonly IRenewal _renewal;
        private readonly IPaymentDetails _paymentDetails;
        private readonly IPlanMaster _planMaster;
        public RenewalController(IRenewal renewal, IPaymentDetails paymentDetails, IPlanMaster planMaster)
        {
            _renewal = renewal;
            _paymentDetails = paymentDetails;
            _planMaster = planMaster;
        }
     
        // GET: api/Renewal/5
        [HttpGet("{memberNo}", Name = "GetRenewal")]
        public RenewalViewModel Get(string memberNo)
        {
            var userId = Convert.ToInt32(this.User.FindFirstValue(ClaimTypes.Name));
            return _renewal.GetMemberNo(memberNo, userId);
        }

        // POST: api/Renewal
        [HttpPost]
        public IActionResult Post([FromBody] RenewalViewModel renewalViewModel)
        {
            if (_renewal.CheckRenewalPaymentExists(renewalViewModel.NewDate,renewalViewModel.MemberId))
            {
                return BadRequest("Already Renewed");//ReasonPhrase
            }
            else
            {
                int cmp = renewalViewModel.NewDate.CompareTo(renewalViewModel.NextRenwalDate);
                var userId = this.User.FindFirstValue(ClaimTypes.Name);

                if (cmp > 0)
                {
                    var months = _planMaster.GetPlanMonthbyPlanId(renewalViewModel.PlanID);
                    var calculatedNextRenewalDate = renewalViewModel.NewDate.AddMonths(months).AddDays(-1);
                    renewalViewModel.NextRenwalDate = calculatedNextRenewalDate;

                    renewalViewModel.Createdby = Convert.ToInt32(userId);
                    if (_paymentDetails.RenewalPayment(renewalViewModel))
                    {
                        return Ok("Renewed Successfully");
                    }
                    else
                    {
                        return BadRequest( "Renewal Failed"); //HttpStatusCode.InternalServerError
                    }
                }

                if (cmp < 0)
                {
                    return BadRequest("Invalid Date");
                }
            }
            return BadRequest("Something went wrong");
        }
    }
}
