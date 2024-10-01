namespace pruebactl.DTO
{
    public class ResponseReportDTO
    {
        public string nombre_completo { get; set; }
        public DateTime fecha { get; set; }
        public TimeSpan hora_entrada { get; set; }
        public TimeSpan hora_salida { get; set; }
        public TimeSpan horas_trabajadas { get; set; }
    }
}
