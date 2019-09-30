using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAdmin.Interfaces;
using WebAdmin.ViewModels;

namespace WebAdmin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GetTotalAmountController : ControllerBase
    {
        private readonly IPlanMaster _planMaster;
        public GetTotalAmountController(IPlanMaster planMaster)
        {
            _planMaster = planMaster;
        }
       

        // POST: api/GetTotalAmount
        [HttpPost]
        public string Post([FromBody] AmountRequestViewModel amountRequest)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    return _planMaster.GetAmount(amountRequest.PlanId, amountRequest.SchemeId);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }      
    }
}
