using System.ComponentModel.DataAnnotations;

namespace pruebactl.Models
{
    public class Funcionario
    {
        [Key]
        public int id_funcionario { get; set; }
        public string nombre { get; set; }
        public int cedula { get; set; }
        public string apellido { get; set; }
        public DateTime fecha_nacimiento { get; set; }
        public int estado { get; set; } = 1;

        public ICollection<Marcacion> Marcaciones { get; set; }
    }
}
