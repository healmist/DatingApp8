using System.Text;
using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);     //our extensions services and configs (housekeeping)
builder.Services.AddIdentityServices(builder.Configuration);
//builder.Services.AddSingleton(); to test

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();                           //from '/Middleware'  
// Configure the HTTP request pipeline.
app.UseCors(builder =>  builder.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("Https://localhost:4200"));

app.UseAuthentication();                                            //if it is a valid 'idetity'
app.UseAuthorization();                                             //if the 'identity' accomplish the conditions

app.MapControllers();

app.Run();