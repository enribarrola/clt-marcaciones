using Microsoft.AspNetCore.Mvc;
using pruebactl.DTO;
using pruebactl.Models;
using pruebactl.Service;

namespace pruebactl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncionarioController(FuncionarioService funcionarioService) : ControllerBase
    {
        private readonly FuncionarioService _funcionarioService = funcionarioService;

        // GET: api/register/{id}
        [HttpGet]
        public async Task<ActionResult<Funcionario>> GetFuncionario()
        {
            try
            {
                var funcionario = await _funcionarioService.GetFuncionariosAsync();

                if (funcionario.Count == 0)
                {
                    return NotFound();
                }

                return Ok(funcionario);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocurrió un error en el servidor." });
            }

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Funcionario>> GetFuncionarioById(int id)
        {
            try
            {
                var funcionario = await _funcionarioService.GetFuncionarioByIdAsync(id);

                if (funcionario == null)
                {
                    return NotFound();
                }

                return Ok(funcionario);
            }catch (Exception)
            {
                return StatusCode(500, new { message = "Ocurrió un error en el servidor."});
            }
            
        }

        // POST: api/register
        [HttpPost]
        public async Task<ActionResult<Funcionario>> CreateFuncionario(FuncionarioDTO funcionario)
        {
            try
            {
                var nuevoFuncionario = await _funcionarioService.CreateFuncionarioAsync(funcionario);
                return CreatedAtAction(nameof(GetFuncionarioById), new { id = nuevoFuncionario.id_funcionario }, nuevoFuncionario);
            } catch (Exception)
            {
                return StatusCode(500, new { message = "Ocurrió un error en el servidor."});
            }
            
        }

        // PUT: api/register/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult?> UpdateFuncionario(int id, FuncionarioDTO funcionario)
        {
            try
            {
   
                // Llamada al servicio para verificar y actualizar
                var funcionarioActualizado = await _funcionarioService.UpdateFuncionarioAsync(id, funcionario);

                // Si el funcionario no existe, devuelve 404 NotFound
                if (funcionarioActualizado == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception)
            {
                // Si ocurre cualquier otro tipo de excepción
                return StatusCode(500, new { message = "Ocurrió un error en el servidor."});
            }
           
        }

        // PUT: api/register/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFuncionario(int id)
        {
            try
            {
                var result = await _funcionarioService.DeleteFuncionarioAsync(id);

                if (!result)
                {
                    return NotFound(new { message = "Funcionario no encontrado." });
                }

                return NoContent();  // Código 204: Operación exitosa sin contenido
            }
            catch (Exception)
            {
                // Si ocurre cualquier otro tipo de excepción
                return StatusCode(500, new { message = "Ocurrió un error en el servidor." });
            }

        }
    }
}
