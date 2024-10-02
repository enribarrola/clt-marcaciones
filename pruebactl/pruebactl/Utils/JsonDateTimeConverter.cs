using System.Globalization;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace pruebactl.Utils
{
    public class JsonDateTimeConverter : JsonConverter<DateTime>
    {
        // para el formateo de las horas
        private readonly string _format = "dd-MM-yyyy"; 

        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (DateTime.TryParseExact(reader.GetString(), _format, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime date))
            {
                return date;
            }
            throw new JsonException($"Invalid date format. Use '{_format}'.");
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString(_format));
        }
    }
}
