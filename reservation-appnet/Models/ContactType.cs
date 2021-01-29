using System;
using System.ComponentModel.DataAnnotations;

namespace reservation_appnet.Models
{
    public class ContactTypeCreateDTO
    {
        [Required]
        [MaxLength(50)]
        public string Description { get; set; }
    }

    public class ContactTypeListDTO : ContactTypeCreateDTO
    {
        public int Id { get; set; }
    }

    public class ContactType: BaseModel
    {
        [Required]
        [MaxLength(50)]
        public string Description { get; set; }
    }
}
