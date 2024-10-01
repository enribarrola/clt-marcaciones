using System;
using System.Globalization;
using Newtonsoft.Json;


namespace pruebactl.Utils
{
    public class TimeSpanConverter : JsonConverter<TimeSpan>
    {
        private const string TimeFormat = @"hh\:mm";

        // Convierte de JSON a TimeSpan
        public override TimeSpan ReadJson(JsonReader reader, Type objectType, TimeSpan existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.String)
            {
                string timeString = (string)reader.Value;

                // Manejar el caso de cadena vacía
                if (string.IsNullOrWhiteSpace(timeString))
                {
                    return default; // Retorna el valor por defecto (TimeSpan.Zero)
                }

                return TimeSpan.ParseExact(timeString, TimeFormat, CultureInfo.InvariantCulture);
            }

            throw new JsonSerializationException("Invalid format for TimeSpan");
        }

        // Convierte de TimeSpan a JSON
        public override void WriteJson(JsonWriter writer, TimeSpan value, JsonSerializer serializer)
        {
            string timeString = value.ToString(TimeFormat);
            writer.WriteValue(timeString);
        }
    }
}
