using Microsoft.EntityFrameworkCore;
using pruebactl.Data;
using pruebactl.DTO;
using pruebactl.Models;

namespace pruebactl.Service
{
    public class FuncionarioService
    {
        private readonly AppDbContext _context;

        public FuncionarioService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Funcionario>> GetFuncionariosAsync()
        {
            return await _context.Funcionarios
                .Where(f => f.estado == 1)
                .ToListAsync();
        }

        public async Task<Funcionario?> GetFuncionarioByIdAsync(int id)
        {
            return await _context.Funcionarios
                .Where(f => f.id_funcionario == id && f.estado == 1)
                .FirstOrDefaultAsync();
        }

        public async Task<Funcionario> CreateFuncionarioAsync(FuncionarioDTO funcionarioDto)
        {
            try
            {
                // Mapea el DTO al modelo Funcionario
                var funcionario = new Funcionario
                {
                    nombre = funcionarioDto.nombre,
                    apellido = funcionarioDto.apellido,
                    fecha_nacimiento = funcionarioDto.fecha_nacimiento
                };

                // Guarda el funcionario en la base de datos
                _context.Funcionarios.Add(funcionario);
                await _context.SaveChangesAsync();

                return funcionario;
            } catch (Exception)
            {
                throw new Exception("Ocurrió un error al crear el funcionario.");
            }
            
        }

        public async Task<Funcionario?> UpdateFuncionarioAsync(int id,FuncionarioDTO funcionario)
        {
            try
            {
                // Primero, verifica si el Funcionario existe
                var funcionarioExistente = await _context.Funcionarios.FindAsync(id);

                // Si no existe, devuelve null
                if (funcionarioExistente == null)
                {
                    return null; // Esto hará que el controlador devuelva 404
                }

                // Actualiza los valores del funcionario existente con los del DTO
                funcionarioExistente.nombre = funcionario.nombre;
                funcionarioExistente.apellido = funcionario.apellido;
                funcionarioExistente.fecha_nacimiento = funcionario.fecha_nacimiento;

                // Marca al funcionario como modificado
                _context.Entry(funcionarioExistente).State = EntityState.Modified;

                // Guarda los cambios en la base de datos
                await _context.SaveChangesAsync();

                // Retorna el funcionario actualizado
                return funcionarioExistente;
            } catch (Exception)
            {
                throw new Exception("Ocurrió un error al actualizar el funcionario.");
            }
           
        }

        public async Task<bool> DeleteFuncionarioAsync(int id)
        {
            try
            {
                // Buscar el funcionario por ID
                var funcionario = await GetFuncionarioByIdAsync(id);

                // Si no existe, devuelve false
                if (funcionario == null)
                {
                    return false;
                }

                // Cambiar el estado a 2 (soft delete)
                funcionario.estado = 2;
                _context.Funcionarios.Attach(funcionario);
                _context.Entry(funcionario).Property(f => f.estado).IsModified = true;
                await _context.SaveChangesAsync();

                return true;
            } catch (Exception)
            {
                throw new Exception("Ocurrió un error al eliminar el funcionario.");
            }
                
        }
    }
}
