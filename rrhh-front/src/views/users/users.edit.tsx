import { useParams } from 'react-router-dom';

export default function UsersEdit() {
  const params = useParams();
  console.log(params);

  return (
    <div className='col'>
      <h2>Editar Usuario</h2>
      <hr />
      <form>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Nombre
          </label>
          <input type='text' className='form-control' id='name' />
        </div>
        <div className='mb-3'>
          <label htmlFor='lastName' className='form-label'>
            Apellido
          </label>
          <input type='text' className='form-control' id='lastName' />
        </div>
        <div className='mb-3'>
          <label htmlFor='documentNumber' className='form-label'>
            Numero de documento
          </label>
          <input type='text' className='form-control' id='documentNumber' />
        </div>
        <div className='mb-3'>
          <label htmlFor='birthDate' className='form-label'>
            Fecha de nacimiento
          </label>
          <input type='date' className='form-control' id='birthDate' />
        </div>
        <button type='submit' className='btn btn-primary'>
          Guardar
        </button>
      </form>
    </div>
  );
}
