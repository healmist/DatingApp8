using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SQLitePCL;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)     //not extracted automatically
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
            {
                return "secret text";
            }
        
        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
            {
                var thing = _context.Users.Find(-1);
                
                if (thing == null) return NotFound();           //predef

                return thing;
            }

        [HttpGet("not-found")]
        public ActionResult<string> GetServerError()
            {
               
                var thing = _context.Users.Find(-1);
                
                var thingToReturn = thing.ToString();

                return thingToReturn;
            }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
            {
                return BadRequest("This was not a good request");       //predefS
            }
    }
}
