import useSWR from 'swr';
import { API_URL } from '../../utils/constants';
import fetcher from '../../db/fetcher';
import { MarcacionResponse } from '../../types/marcacion';

export default function TimestampsTable() {
  const { data } = useSWR<MarcacionResponse[]>(`${API_URL}/marcacion`, fetcher);

  return (
    <div className='col'>
      <table className='table table-hover '>
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Fecha</th>
            <th>Hora entrada</th>
            <th>Hora Salida</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user,index) => (
            <tr key={index}>
              <td>{user.nombre_completo}</td>
              <td>{new Date(user.fecha).toLocaleDateString()}</td>
              <td>{user.hora_entrada}</td>
              <td>{user.hora_salida}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
