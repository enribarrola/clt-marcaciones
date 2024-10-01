export default function UsersForm() {
  return (
    <form className='d-flex flex-column col-3'>
      <label htmlFor='name' className='fw-bold'>
        Nombre
      </label>
      <input type='text' id='name' name='name' className='form-control' />

      <label htmlFor='lastname' className='fw-bold'>
        Apellido
      </label>
      <input type='text' id='lastname' name='lastname' className='form-control' />

      <label htmlFor='documentNumber' className='fw-bold'>
        Numero de documento
      </label>
      <input type='number' id='documentNumber' name='documentNumber' className='form-control' />

      <label htmlFor='birthday' className='fw-bold'>
        Fecha de nacimiento
      </label>
      <input type='date' id='birthday' name='birthday' className='form-control' />

      <button type='submit' className='btn btn-primary mt-3'>
        Agregar
      </button>
    </form>
  );
}
