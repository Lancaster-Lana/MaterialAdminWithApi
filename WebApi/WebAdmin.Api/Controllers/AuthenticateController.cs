﻿using System;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using WebAdmin.Common;
using WebAdmin.Interfaces;
using WebAdmin.ViewModels;

namespace WebAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly IUsers _users;
        public AuthenticateController(IOptions<AppSettings> appSettings, IUsers users)
        {
            _users = users;
            _appSettings = appSettings.Value;
        }

        // POST: api/Authenticate
        [HttpPost]
        public IActionResult Post([FromBody] LoginRequestViewModel value)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var loginstatus = _users.AuthenticateUsers(value.UserName, EncryptionLibrary.EncryptText(value.Password));

                    if (loginstatus)
                    {
                        var userdetails = _users.GetUserDetailsbyCredentials(value.UserName);

                        if (userdetails != null)
                        {
                            var tokenHandler = new JwtSecurityTokenHandler();
                            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                            var tokenDescriptor = new SecurityTokenDescriptor
                            {
                                Subject = new ClaimsIdentity(new Claim[]
                                {
                                    new Claim(ClaimTypes.Name, userdetails.UserId.ToString())
                                }),
                                Expires = DateTime.UtcNow.AddDays(1),
                                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                                    SecurityAlgorithms.HmacSha256Signature)
                            };
                            var token = tokenHandler.CreateToken(tokenDescriptor);
                            value.Token = tokenHandler.WriteToken(token);
                            value.Usertype = userdetails.RoleId;

                            // remove password before returning
                            value.Password = null;
                            return Ok(value);
                        }
                    }
                    value.Password = null;
                    value.Usertype = 0;
                    return Ok(value);
                }
                value.Password = null;
                value.Usertype = 0;
                return Ok(value);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}