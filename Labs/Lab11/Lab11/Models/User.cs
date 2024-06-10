using System.ComponentModel.DataAnnotations;

namespace Lab11.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        public string? Email { get; set; }
        public int Age { get; set; }
        public string? Webpage { get; set; }
    }
}
