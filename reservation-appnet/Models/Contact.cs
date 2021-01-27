using System;
using System.ComponentModel.DataAnnotations;

namespace reservation_appnet.Models
{
    public class Contact: BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public DateTime Birthdate { get; set; }

        [Required]
        public ContactType ContactType { get; set; }
    }
}