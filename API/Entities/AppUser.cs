using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser
    {
        //[Key] is used for primarykeys others an 'Id' using data anotations
        public int Id { get; set; }
        public string UserName { get; set; }


    }
}