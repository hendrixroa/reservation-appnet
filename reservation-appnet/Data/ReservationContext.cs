using Microsoft.EntityFrameworkCore;

using reservation_appnet.Models;
using reservation_appnet;

namespace reservation_appnet.Data
{
    public class ReservationContext : DbContext
    {
        public ReservationContext(DbContextOptions<ReservationContext> options) : base(options)
        {
        }
        
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<ContactType> ContactTypes { get; set; }
        public DbSet<Reservation> Reservation { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>()
                .ToTable("Contacts")
                .Property(c => c.CreatedAt)
                .HasDefaultValueSql("now()");

            modelBuilder.Entity<ContactType>()
                .ToTable("ContactTypes")
                .Property(c => c.CreatedAt)
                .HasDefaultValueSql("now()"); ;

            modelBuilder.Entity<Reservation>()
                .ToTable("Reservations")
                .Property(c => c.CreatedAt)
                .HasDefaultValueSql("now()"); ;
        }

    }
}
