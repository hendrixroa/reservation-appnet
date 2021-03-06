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
    public class ContactQuery : QueryPagination
    {
        public string? Name { get; set; }
    }
    
    [Route("/contacts")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ReservationContext _context;
        private readonly ILogger<ContactController> _logger;


        public ContactController(ReservationContext context, ILogger<ContactController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<ResultPagination>> GetContacts([FromQuery] ContactQuery query)
        {

            var page = query.Page;
            var limit = query.Limit;
            if(query.Page == null)
            {
                page = 1;
            }
            if(query.Limit == null)
            {
                limit = 20;
            }
            
            if(query.Name != null)
            {
                var item = await _context.Contacts
                    .Where(contact => contact.Name == query.Name)
                    .Select(contact => ContactListToDTO(contact))
                    .ToListAsync();
                return new ResultPagination
                {
                    Items = item,
                    Page = (int)page,
                    Pages = 1,
                    Count = 1,  
                };
            }
            var items = await _context.Contacts
                .Skip((int)((page - 1) * limit))
                .Take((int)limit)
                .Select(contact => ContactListToDTO(contact))
                .ToListAsync();

            var count = _context.Contacts.Count();
            return new ResultPagination
            {
                Items = items,
                Page = (int)page,
                Pages = (int)Math.Round((decimal)(count / limit)),
                Count = count
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, ContactCreateDTO contactCreateDTO)
        {
            if (!ContactExists(id))
            {
                return BadRequest();
            }

            var contactType = ContactTypeExists(contactCreateDTO.ContactType);

            if(contactType == null)
            {
                return BadRequest();
            }

            var contact = new Contact
            {
                Id = id,
                Name = contactCreateDTO.Name,
                Birthdate = contactCreateDTO.Birthdate,
                ContactType = contactCreateDTO.ContactType,
                Phone = contactCreateDTO.Phone,
                UpdatedAt = DateTime.UtcNow
            };
            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(ContactCreateDTO contactCreateDTO)
        {
            var contactType = ContactTypeExists(contactCreateDTO.ContactType);

            if (contactType == null)
            {
                return BadRequest();
            }

            var contact = new Contact
            {
                Name = contactCreateDTO.Name,
                Birthdate = contactCreateDTO.Birthdate,
                Phone = contactCreateDTO.Phone,
                ContactType = contactType.Description,
            };
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.Id == id);
        }

        private ContactType ContactTypeExists(string contactType)
        {
            return _context.ContactTypes.SingleOrDefault(e => e.Description == contactType);
        }

        private static ContactListDTO ContactListToDTO(Contact contact) =>
            new ContactListDTO
            {
                Id = contact.Id,
                Name = contact.Name,
                ContactType = contact.ContactType,
                Birthdate = contact.Birthdate,
                Phone = contact.Phone,
            };
    }
}
