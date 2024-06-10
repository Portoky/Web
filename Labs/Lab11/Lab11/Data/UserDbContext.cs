using Lab11.Models;
using Microsoft.EntityFrameworkCore;

namespace Lab11.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions options) : base(options) { }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your model here using Fluent API or Data Annotations
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<User>().HasKey(u => u.Id);
            // Add more configurations as needed

            base.OnModelCreating(modelBuilder);
        }
    }
}
