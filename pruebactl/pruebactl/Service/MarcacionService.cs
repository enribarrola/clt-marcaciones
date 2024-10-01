using Microsoft.EntityFrameworkCore;
using pruebactl.Data;
using pruebactl.DTO;
using pruebactl.Models;

namespace pruebactl.Service
{
    public class MarcacionService
    {
        private readonly AppDbContext _context;
        private readonly FuncionarioService _funcionarioService;

        public MarcacionService(FuncionarioService funcionarioService, AppDbContext context)
        {
            _funcionarioService = funcionarioService;
            _context = context;
        }

        //listar todas las marcaciones con el nombre completo del funcionario
        public async Task<List<Marcacion>> GetMarcacionesAsync()
        {
            try
            {
                // Incluir los datos del Funcionario asociado a cada Marcacion
                return await _context.Marcaciones
                    .Include(m => m.Funcionario)
                    .OrderByDescending(m => m.id_marcacion)
                    .ToListAsync();
            } catch (Exception)
            {
                throw new Exception("Ocurrió un error al obtener las marcaciones.");
            }
        }

        // Crear una marcación para un funcionario
        public async Task CreateMarcacionAsync(MarcacionDTO marcacion)
        {
            try
            {
                var newMarcacion = new Marcacion
                {
                    id_funcionario = marcacion.id_funcionario,
                    fecha = marcacion.fecha,
                    hora_entrada = marcacion.hora_entrada,
                    hora_salida = marcacion.hora_salida
                };
                _context.Marcaciones.Add(newMarcacion);
                await _context.SaveChangesAsync();
            } catch (Exception)
            {
                throw new Exception("Ocurrió un error al crear la marcación.");
            }
        }

        public async Task<Marcacion?> GetLastMarcacionByFuncionario(int id)
        {
            try
            {
                // Obtiene la última marcación de un funcionario, este metodo se utiliza para que no se pueda registrar una marcación en la misma fecha
                return await _context.Marcaciones
             .Where(m => m.id_funcionario == id) 
             .OrderByDescending(m => m.fecha) 
             .FirstOrDefaultAsync(); 
            } catch (Exception)
            {
                throw new Exception("Ocurrió un error al obtener la última marcación.");
            }
        }

        //reporte de marcaciones por funcionario retornando nombre completo, fecha, hora de entrada, hora de salida, y horas trabajadas en un rango de fecha desde hasta
        public async Task<List<ResponseReportDTO>> GetMarcacionReport(int id_funcionario, DateTime fecha_desde, DateTime fecha_hasta)
        {
            try
            {

                // Obtener todas las marcaciones
                var marcaciones = await GetMarcacionesAsync();

                // Filtrar y mapear a ResponseReportDTO
                var result = marcaciones
                    .Where(m => m.id_funcionario == id_funcionario && m.fecha >= fecha_desde && m.fecha <= fecha_hasta)
                    .Select(m => new ResponseReportDTO
                    {
                        nombre_completo = m.Funcionario.nombre + " " + m.Funcionario.apellido,
                        fecha = m.fecha,
                        hora_entrada = m.hora_entrada,
                        hora_salida = m.hora_salida,
                        horas_trabajadas = m.hora_salida - m.hora_entrada
                    }).ToList();

                return result;

            } catch (Exception)
            {
                throw new Exception("Ocurrió un error al obtener el reporte de marcaciones.");
            }
        }

    }
}
