namespace pruebactl.DTO
{
    public class MarcacionDTO
    {
        public int id_funcionario { get; set; }
        public DateTime fecha { get; set; }
        public TimeSpan hora_entrada { get; set; }
        public TimeSpan hora_salida { get; set; }
    }
}
