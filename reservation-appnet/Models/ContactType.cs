using System.ComponentModel.DataAnnotations;

namespace reservation_appnet.Models
{
    public class ContactType: BaseModel
    {
        [Required]
        [MaxLength(50)]
        public string Description { get; set; }
    }
}
