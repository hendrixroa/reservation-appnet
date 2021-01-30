using Microsoft.EntityFrameworkCore;

using reservation_appnet.Models;
using reservation_appnet;
using Microsoft.EntityFrameworkCore.Metadata;
using System;

namespace reservation_appnet.Data
{
    public class ReservationContext : DbContext
    {
        public ReservationContext(DbContextOptions<ReservationContext> options) : base(options)
        {
        }
        
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<ContactType> ContactTypes { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<ContactType>()
                .ToTable("ContactTypes")
                .Property(c => c.CreatedAt)
                .HasDefaultValueSql("now()");

            modelBuilder.Entity<ContactType>()
                .ToTable("ContactTypes")
                .Property(c => c.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Save);

            modelBuilder.Entity<ContactType>()
                .HasData(
                    new ContactType { Id = 1, Description = "Contact Type 1", },
                    new ContactType { Id = 2, Description = "Contact Type 2" },
                    new ContactType { Id = 3, Description = "Contact Type 3" }
                );

            modelBuilder.Entity<Contact>()
                .ToTable("Contacts")
                .Property(c => c.CreatedAt)
                .HasDefaultValueSql("now()");

            modelBuilder.Entity<Contact>()
                .ToTable("Contacts")
                .Property(c => c.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Save);

            modelBuilder.Entity<Reservation>()
                .ToTable("Reservations")
                .Property(c => c.CreatedAt)
                .HasDefaultValueSql("now()");

            modelBuilder.Entity<Reservation>()
                .ToTable("Reservations")
                .Property(c => c.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Save);
        }

    }
}
