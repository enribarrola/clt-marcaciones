
using pruebactl.Data;
using Microsoft.EntityFrameworkCore;
using pruebactl.Service;
using pruebactl.Utils;

namespace pruebactl
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configurar el servicio DbContext con PostgreSQL
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQLConnection")));

            // Add services to the container.
            builder.Services.AddScoped<FuncionarioService>();
            builder.Services.AddScoped<MarcacionService>();
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddControllers()
            .AddNewtonsoftJson(options =>
            {
                // Aquí puedes agregar cualquier configuración personalizada para Newtonsoft.Json
                // Añades el convertidor personalizado si es necesario (ej. para TimeSpan)
                options.SerializerSettings.Converters.Add(new TimeSpanConverter());
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }

    }
}
