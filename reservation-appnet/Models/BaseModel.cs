using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace reservation_appnet.Models
{
    public abstract class BaseModel
    {
        public int Id { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime UpdatedAt { get; set; }
    }
}
