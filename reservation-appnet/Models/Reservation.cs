using System;
using System.ComponentModel.DataAnnotations;
using reservation_appnet.Models;

namespace reservation_appnet
{

    public class ReservationCreateDTO
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

       
        public int? Rating { get; set; }
        public bool? Favorite { get; set; }
    }

    public class ReservationListDTO : ReservationCreateDTO
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class Reservation : BaseModel
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public int? Rating { get; set; }
        public bool? Favorite { get; set; }

        [Required]
        public Contact Contact { get; set; }
    }
}