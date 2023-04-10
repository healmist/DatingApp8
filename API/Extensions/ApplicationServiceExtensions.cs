using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,   //defined here, implemented in reference
            IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
                {
                    opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
                });

            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();  //including an interface as service also allowto test easily, so mockly implementing it

            return services;
        }
    }
}