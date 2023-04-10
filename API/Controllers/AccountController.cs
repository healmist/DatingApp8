using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context; //initialize field from parametter
        }

        [HttpPost("register")]      //POST: api/['controlerName']/register (and here Account == controlerName)
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)  //from /DTOs
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is alredy taken");

            using var hmac = new HMACSHA512();  //implements IDisposable (including GC)

            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),                                      //why colon?
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),  //'s' cant be null ->exception
                PasswordSalt = hmac.Key                                             //random gend
            };   

            _context.Users.Add(user);   //appending
            await _context.SaveChangesAsync();

            return new UserDto  //return from defining our two new props
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _context.Users.SingleOrDefaultAsync(x => 
                x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if  (computedHash[i] != user.PasswordHash[i]) return Unauthorized("invalid password");

            }

            return new UserDto  
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }
        //awaited in line 25
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());  //reviews the content of line 27
        }
    }
}