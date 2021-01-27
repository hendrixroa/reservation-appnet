using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reservation_appnet.Data;
using reservation_appnet.Models;

namespace reservation_appnet.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class ContactTypeController : ControllerBase
    {
        private readonly ReservationContext _context;

        public ContactTypeController(ReservationContext context)
        {
            _context = context;
        }

        // GET: api/ContactType
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactType>>> GetContactType()
        {
            return await _context.ContactTypes.ToListAsync();
        }

        // GET: api/ContactType/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactType>> GetBaseModel(int id)
        {
            var contactType = await _context.ContactTypes.FindAsync(id);

            if (contactType == null)
            {
                return NotFound();
            }

            return contactType;
        }

        // PUT: api/ContactType/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContactType(int id, ContactType contactType)
        {
            if (id != contactType.Id)
            {
                return BadRequest();
            }

            _context.Entry(contactType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ContactType
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ContactType>> PostContactType([Bind("Description")] ContactType contactType)
        {
            try
            {
                _context.ContactTypes.Add(contactType);
            await _context.SaveChangesAsync();
            }
            catch (Exception /* ex */)
            {
                                
            }
            return CreatedAtAction("GetContactType", new { id = contactType.Id }, contactType);
        }

        // DELETE: api/ContactType/5
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
    }
}
