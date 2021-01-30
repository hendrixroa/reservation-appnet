using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace reservation_appnet.Models
{
    public class ContactCreateDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Birthdate { get; set; }

        [Required]
        public ContactTypeCreateDTO ContactType { get; set; }

        public string Phone { get; set; }
    }

    public class ContactListDTO : ContactCreateDTO
    {
        public int Id { get; set; }
    }

    public class Contact: BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Birthdate { get; set; }

        [Required]
        public ContactType ContactType { get; set; }

        public string Phone { get; set; }

        public List<Reservation> Reservations { get; set; }
    }
}