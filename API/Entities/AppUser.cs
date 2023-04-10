using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser
    {
        //[Key] is used for primarykeys others an 'Id' using data anotations
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }   
}