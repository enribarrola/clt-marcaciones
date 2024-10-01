export default function TimestampsForm() {
  return (
    <form className='d-flex flex-column '>
      <label htmlFor='worker'>Trabajador</label>
      <select name='worker' id='worker' className='form-control'>
        <option value='1'>Juan Perez - 5.460.696</option>
        <option value='2'>Maria Rodriguez - 3.234.234</option>
      </select>
      <label htmlFor='date'>Fecha</label>
      <input type='date' id='date' name='date' className='form-control' />
      <label htmlFor='enterTime'>Hora de entrada</label>
      <input type='time' id='enterTime' name='enterTime' className='form-control' />
      <label htmlFor='exitTime'>Hora de salida</label>
      <input type='time' id='exitTime' name='exitTime' className='form-control' />

      <button type='submit' className='btn btn-primary mt-3'>
        Registrar
      </button>
    </form>
  );
}
