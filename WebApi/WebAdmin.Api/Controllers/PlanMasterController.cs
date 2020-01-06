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
using Microsoft.AspNetCore.Http;

namespace WebAdmin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PlanMasterController : ControllerBase
    {
        private readonly IPlanMaster _planMaster;
        public PlanMasterController(IPlanMaster planMaster)
        {
            _planMaster = planMaster;
        }
        // GET: api/PlanMaster
        [HttpGet]
        public IEnumerable<PlanMasterDisplayViewModel> Get()
        {
            return _planMaster.GetPlanMasterList();
        }

        // GET: api/PlanMaster/5
        [HttpGet("{id}", Name = "GetPlan")]
        public PlanMasterViewModel Get(int id)
        {
            try
            {
                return _planMaster.GetPlanMasterbyId(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // POST: api/PlanMaster
        [HttpPost]
        public IActionResult Post([FromBody] PlanMasterViewModel planMasterViewModel)
        {
            try
            {
                if (_planMaster.CheckPlanExits(planMasterViewModel.PlanName))
                {
                    return Conflict();
                }
                else
                {
                    var userId = this.User.FindFirstValue(ClaimTypes.Name);
                    var tempplanMaster = AutoMapper.Mapper.Map<PlanMaster>(planMasterViewModel);
                    tempplanMaster.CreateUserID = Convert.ToInt32(userId);
                    tempplanMaster.RecStatus = true;
                    _planMaster.InsertPlan(tempplanMaster);

                    return Ok();
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // PUT: api/PlanMaster/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] PlanMasterViewModel planMasterViewModel)
        {
            try
            {
                var userId = this.User.FindFirstValue(ClaimTypes.Name);
                var tempplanMaster = AutoMapper.Mapper.Map<PlanMaster>(planMasterViewModel);
                tempplanMaster.CreateUserID = Convert.ToInt32(userId);
                tempplanMaster.RecStatus = true;
                _planMaster.UpdatePlanMaster(tempplanMaster);
                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            { 
                _planMaster.DeletePlan(id);

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}