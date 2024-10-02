
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
                options.UseNpgsql(builder.Configuration["PostgreSQLConnection"]));
                

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
                options.SerializerSettings.Converters.Add(new TimeSpanConverter());
            });

			// Configurar CORS
			var allowedOrigins = builder.Configuration["CORS_ORIGINS"]?.Split(',') ?? new string[0];
			builder.Services.AddCors(options =>
        	{
            options.AddPolicy("AllowSpecificOrigins", builder =>
            {
                builder
                    .WithOrigins(allowedOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        	});
 			
			

            var app = builder.Build();
			// Configurar CORS en la aplicación
        	app.UseCors("AllowSpecificOrigins");

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
