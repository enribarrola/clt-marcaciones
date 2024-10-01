using Newtonsoft.Json;
using pruebactl.Utils;
using System.ComponentModel.DataAnnotations;

namespace pruebactl.Models
{
    public class Marcacion
    {
        [Key]
        public int id_marcacion { get; set; }
        public int id_funcionario { get; set; } 
        public DateTime fecha { get; set; }

        [JsonConverter(typeof(TimeSpanConverter))]
        public TimeSpan hora_entrada { get; set; }
        [JsonConverter(typeof(TimeSpanConverter))]
        public TimeSpan hora_salida { get; set; }

        public Funcionario Funcionario { get; set; }

    }
}
