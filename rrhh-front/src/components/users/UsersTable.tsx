import { useNavigate } from 'react-router-dom';
import { FaTrash, FaUserEdit } from 'react-icons/fa';

export default function UsersTable() {
  const navigate = useNavigate();

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
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>12345678</td>
            <td>01/01/2000</td>
            <td className='d-flex gap-2'>
              <button className='btn btn-primary' onClick={() => navigate('/users/1/edit')} title='Editar'>
                <FaUserEdit />
              </button>
              <button className='btn btn-danger' title='Eliminar'>
                <FaTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
