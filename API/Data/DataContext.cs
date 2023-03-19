using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        //constructors
        public DataContext(DbContextOptions options) : base(options)    //config
        {
        }
        public DbSet<AppUser> Users { get; set; }   //User is row, and AppUser is Column
    }
}