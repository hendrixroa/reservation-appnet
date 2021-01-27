using Microsoft.EntityFrameworkCore;

using reservation_appnet.Models;

namespace reservation_appnet.Data
{
    public class ReservationContext : DbContext
    {
        public ReservationContext(DbContextOptions<ReservationContext> options) : base(options)
        {
        }
        
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<ContactType> ContactTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().ToTable("Contacts");
            modelBuilder.Entity<ContactType>().ToTable("ContactTypes");
        }
    }
}
