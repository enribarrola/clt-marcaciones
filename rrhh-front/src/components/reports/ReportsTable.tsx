import { Marcacion } from '../../types/marcacion';

export default function ReportsTable({ marcaciones }: { marcaciones: Marcacion[] }) {
  return (
    <table className='table table-hover '>
      <thead>
        <tr>
          <th>Trabajador</th>
          <th>Hora entrada</th>
          <th>Hora de salida</th>
          <th>Horas trabajadas</th>
        </tr>
      </thead>
      <tbody>
        {marcaciones.map((marcacion, i) => (
          <tr key={i + marcacion.nombre_completo}>
            <td>{marcacion.nombre_completo}</td>
            <td>{marcacion.hora_entrada}</td>
            <td>{marcacion.hora_salida}</td>
            <td>{marcacion.horas_trabajadas}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
