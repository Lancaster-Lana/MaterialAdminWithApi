using System;
using Microsoft.AspNetCore.Mvc;
using WebAdmin.Interfaces;
using WebAdmin.ViewModels;

namespace WebAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenerateRecepitController : ControllerBase
    {
        private readonly IGenerateRecepit _generateRecepit;
        public GenerateRecepitController(IGenerateRecepit generateRecepit)
        {
            _generateRecepit = generateRecepit;
        }
       

        // POST: api/GenerateRecepit
        [HttpPost]
        public GenerateRecepitViewModel Post([FromBody] GenerateRecepitRequestModel generateRecepitRequestModel)
        {
            try
            {
                return _generateRecepit.Generate(generateRecepitRequestModel.PaymentId);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
