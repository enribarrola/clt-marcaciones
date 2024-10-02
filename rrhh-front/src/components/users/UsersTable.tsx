import { useNavigate } from 'react-router-dom';
import { FaTrash, FaUserEdit } from 'react-icons/fa';
import useSWR, { mutate } from 'swr';
import { API_URL } from '../../utils/constants';
import fetcher from '../../db/fetcher';
import { Funcionario } from '../../types/funcionario';
import axios from 'axios';
import Swal from 'sweetalert2';
import { errorHandler } from '../../utils/handlers';

export default function UsersTable() {
  const navigate = useNavigate();
  const { data } = useSWR<Funcionario[]>(`${API_URL}/funcionario`, fetcher);

  const handleDelete = async (id: number) => {
    const confirmation = await Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta accion no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (!confirmation.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/funcionario/${id}`);
      Swal.fire({
        title: 'Exito',
        text: 'El funcionario se elimino correctamente',
        icon: 'success'
      });
      //refresca la cache de swr
      mutate(`${API_URL}/funcionario`);
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  return (
    <div className='col'>
      <table className='table table-hover '>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Numero de documento</th>
            <th>Fecha de nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id_funcionario}>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.cedula}</td>
              <td>{new Date(user.fecha_nacimiento).toLocaleDateString()}</td>
              <td className='d-flex gap-2'>
                <button
                  className='btn btn-primary'
                  onClick={() => navigate(`/users/${user.id_funcionario}/edit`)}
                  title='Editar'
                >
                  <FaUserEdit />
                </button>
                <button
                  className='btn btn-danger'
                  title='Eliminar'
                  onClick={() => {
                    handleDelete(user.id_funcionario);
                  }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
