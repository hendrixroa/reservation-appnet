using System;

namespace reservation_appnet.Models
{
    public abstract class BaseModel
    {
        public int Id { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
