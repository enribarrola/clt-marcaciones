using Microsoft.AspNetCore.Mvc;
using pruebactl.DTO;
using pruebactl.Models;
using pruebactl.Service;

namespace pruebactl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcacionController(MarcacionService marcacionService,FuncionarioService funcionarioService): ControllerBase
    {
        private readonly MarcacionService _marcacionService = marcacionService;
        private readonly FuncionarioService _funcionarioService = funcionarioService;

        [HttpGet]
        public async Task<ActionResult<Marcacion>> GetMarcacion()
        {
            try
            {
                var marcaciones = await _marcacionService.GetMarcacionesAsync();

                if (marcaciones == null || marcaciones.Count == 0)
                {
                    return NotFound(new { message = "No se encontraron marcaciones." });
                }

                var result = marcaciones.Select(m => new
                {
                    nombre_completo = m.Funcionario.nombre + " " + m.Funcionario.apellido,
                    m.fecha,
                    m.hora_entrada,
                    m.hora_salida
                }).ToList();

                return Ok(result);

            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocurrió un error en el servidor." });
            }

        }

        [HttpPost]
        public async Task<ActionResult<Marcacion>> CreateMarcacion(MarcacionDTO marcacion)
        {
            try
            {
                var funcionario = await _funcionarioService.GetFuncionarioByIdAsync(marcacion.id_funcionario);
                if(funcionario == null)
                {
                    return BadRequest(new { message = "El funcionario no existe." });
                }

                // Verificar si la fecha de la marcación es igual a la fecha de la última marcación
                var ultimaMarcacion = await _marcacionService.GetLastMarcacionByFuncionario(marcacion.id_funcionario);
                if(ultimaMarcacion != null)
                {          
                    if (marcacion.fecha.Date == ultimaMarcacion.fecha.Date)
                    {
                        return BadRequest(new { message = "La fecha de marcacion no puede ser igual a la última marcación." });
                    }
                }

                // verificacion de los horarios fueron proporcionados
                if (marcacion.hora_entrada == default(TimeSpan))
                {
                    return BadRequest(new { message = "La hora de entrada es obligatoria." });
                }

                if (marcacion.fecha == default(DateTime))
                {
                    return BadRequest(new { message = "La fecha de la marcación es obligatoria." });
                }

                if (marcacion.hora_salida == default(TimeSpan))
                {
                    return BadRequest(new { message = "La hora de salida es obligatoria." });
                }

                // Verificar si la hora de salida es menor que la hora de entrada
                if (marcacion.hora_salida <= marcacion.hora_entrada)
                {
                    return BadRequest(new { message = "La hora de salida no puede ser menor o igual a la hora de entrada." });
                }
                await _marcacionService.CreateMarcacionAsync(marcacion);

                return Ok(marcacion);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocurrió un error en el servidor." });
            }
        }

        //obtener por queryparams el funcionario fecha_desde y fecha_hasta
        [HttpGet("report")]
        public async Task<ActionResult<ResponseReportDTO>> GetMarcacionReport([FromQuery] int id_funcionario, [FromQuery] DateTime fecha_desde, [FromQuery] DateTime fecha_hasta)
        {
            try
            {
                if (fecha_desde > fecha_hasta)
                {
                    return BadRequest(new { message = "La fecha desde no puede ser mayor a la fecha hasta." });
                }

                //verificar que el funcionario exista o este activo para poder registrar la marcacion
                var funcionario = await _funcionarioService.GetFuncionarioByIdAsync(id_funcionario);
                if (funcionario == null)
                {
                    return BadRequest(new { message = "El funcionario no existe." });
                }

                // Verificar si tiene marcaciones en el rango de fecha
                var marcaciones = await _marcacionService.GetMarcacionReport(id_funcionario,fecha_desde,fecha_hasta);
                if (marcaciones == null || marcaciones.Count == 0)
                {
                    return NotFound(new { message = "No se encontraron marcaciones." });
                }

                return Ok(marcaciones);

            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocurrió un error en el servidor." });
            }

        }   
       

        
    }
}
