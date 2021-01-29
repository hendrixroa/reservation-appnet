using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using reservation_appnet.Data;
using reservation_appnet.Models;

namespace reservation_appnet.Controllers
{
    [Route("/contact/types")]
    [ApiController]
    public class ContactTypeController : ControllerBase
    {
        private readonly ReservationContext _context;
        private readonly ILogger<ContactTypeController> _logger;


        public ContactTypeController(ReservationContext context, ILogger<ContactTypeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactTypeListDTO>>> ListContactType()
        {
            return await _context.ContactTypes
                .Select(contactType => ContactTypeListToDTO(contactType))
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactType>> DetailContactType(int id)
        {
            var contactType = await _context.ContactTypes.FindAsync(id);

            if (contactType == null)
            {
                return NotFound();
            }

            return contactType;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutContactType(int id, ContactTypeCreateDTO contactTypeCreateDTO)
        {
            if (!ContactTypeExists(id))
            {
                return NotFound();
            }

            var contactType = new ContactType { Id = id, Description = contactTypeCreateDTO.Description, UpdatedAt = DateTime.UtcNow};
            _context.Entry(contactType).State = EntityState.Modified;

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

        [HttpPost]
        public async Task<ActionResult> PostContactType(ContactTypeCreateDTO contactTypeCreateDTO)
        {
            try
            {
                var contactType = new ContactType { Description = contactTypeCreateDTO.Description, CreatedAt = DateTime.UtcNow };
                _context.ContactTypes.Add(contactType);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex/* ex */)
            {
                _logger.LogError(ex.ToString());
                return BadRequest(ex);
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContactType(int id)
        {
            var contactType = await _context.ContactTypes.FindAsync(id);
            if (contactType == null)
            {
                return NotFound();
            }

            _context.ContactTypes.Remove(contactType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactTypeExists(int id)
        {
            return _context.ContactTypes.Any(e => e.Id == id);
        }

        private static ContactTypeListDTO ContactTypeListToDTO(ContactType contactType) =>
            new ContactTypeListDTO
            {
                Id = contactType.Id,
                Description = contactType.Description
            };
        }

}
