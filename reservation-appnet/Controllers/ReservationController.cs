using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reservation_appnet.Data;
using reservation_appnet.Models;

namespace reservation_appnet.Controllers
{

    [Route("/reservations")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationContext _context;

        public ReservationController(ReservationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ResultPagination>> GetReservations([FromQuery] QueryPagination query)
        {
            var page = query.Page;
            var limit = query.Limit;
            if (query.Page == null)
            {
                page = 1;
            }
            if (query.Limit == null)
            {
                limit = 20;
            }

            var items = await _context.Reservations
                .Skip((int)((page - 1) * limit))
                .Take((int)limit)
                .Select(reservation => ReservationListToDTO(reservation))
                .ToListAsync();

            var count = _context.Reservations.Count();

            return new ResultPagination
            {
                Items = items,
                Pages = (int)Math.Round((decimal)(count / limit)),
                Page = (int)page,
                Count = count
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, ReservationCreateDTO reservationDTO)
        {
            if (!ReservationExists(id))
            {
                return NotFound();
            }

            var reservation = DTOCreateToReservation(reservationDTO);
            reservation.Id = id;
            reservation.UpdatedAt = DateTime.UtcNow;
            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return NoContent();
        }

        [HttpPost("contact/{contactId}")]
        public async Task<ActionResult> PostReservation(int contactId, ReservationCreateDTO reservationCreateDTO)
        {
            var contact = await _context.Contacts.FindAsync(contactId);
            if (contact == null)
            {
                return NotFound();
            }

            var reservation = DTOCreateToReservation(reservationCreateDTO);
            reservation.Contact = contact;
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}/favorite")]
        public async Task<ActionResult> AddFavoriteReservation(int id, ReservationFavoriteDTO reservationFavoriteDTO)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            reservation.Favorite = reservationFavoriteDTO.Favorite;
            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return NoContent();
        }

        [HttpPut("{id}/rating")]
        public async Task<ActionResult> AddRatingReservation(int id, ReservationRatingDTO reservationRatingDTO)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            reservation.Rating = reservationRatingDTO.Rating;
            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return NoContent();
        }

        private bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.Id == id);
        }

        private int ReservationCount()
        {
            return _context.Reservations.Count();
        }

        private static ReservationListDTO ReservationListToDTO(Reservation reservation) =>
            new ReservationListDTO
            {
                Id = reservation.Id,
                Title = reservation.Title,
                Description = reservation.Description,
                Rating = reservation.Rating,
                Favorite = reservation.Favorite,
            };

        private static Reservation DTOCreateToReservation(ReservationCreateDTO reservationDTO) =>
           new Reservation
           {
               Title = reservationDTO.Title,
               Description = reservationDTO.Description,
               Rating = reservationDTO.Rating,
               Favorite = reservationDTO.Favorite,
           };

    }
}
