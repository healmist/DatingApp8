using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("API/[controller]")] //  API/users
    public class UsersController
    {
        private readonly DataContext _context;                  //_context is the private prop indicator

        public UsersController(DataContext context)
        {
            _context = context;                                 //_context (by convention ) instead of 'this.context'
        }

        [HttpGet]
        //search in the github the non Async version of this code
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()    //IEnumerable<AppUser> is what we're getting
        {
            var users = await _context.Users.ToListAsync();                // cuz 'Users' is the PK

            return users;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);                     //just find certain id, SIMPLIFIES SYNTAX OF LINES 26-28
        }
    }
}