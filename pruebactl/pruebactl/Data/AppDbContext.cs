using Microsoft.EntityFrameworkCore;
using pruebactl.Models;

namespace pruebactl.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSet para Empleados y Marcaciones
        public DbSet<Funcionario> Funcionarios { get; set; }
        public DbSet<Marcacion> Marcaciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración de las tablas
            modelBuilder.Entity<Funcionario>().ToTable("funcionarios");
            modelBuilder.Entity<Marcacion>().ToTable("marcaciones");
            modelBuilder.Entity<Marcacion>()
                .HasOne(m => m.Funcionario)
                .WithMany(f => f.Marcaciones) 
                .HasForeignKey(m => m.id_funcionario); // Clave foránea
        }

    }
}
