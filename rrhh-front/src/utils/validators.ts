export function validarFechaAnteriorQueHoy(value: string) {
  const fechaIngresada = new Date(value);
  const fechaHoy = new Date();
  fechaHoy.setHours(0, 0, 0, 0);
  return fechaIngresada < fechaHoy || 'La fecha debe ser menor que hoy';
}
