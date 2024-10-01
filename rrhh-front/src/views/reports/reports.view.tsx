import ReportsTable from '../../components/reports/ReportsTable';

export default function ReportsView() {
  return (
    <div>
      <h2>Reporte de Marcaciones</h2>
      <hr />

      <div className='row'>
        <form className='d-flex flex-column col-3'>
          <label htmlFor='worker'>Trabajador</label>
          <select name='worker' id='worker' className='form-control'>
            <option value='1'>Juan Perez - 5.460.696</option>
            <option value='2'>Maria Rodriguez - 3.234.234</option>
          </select>
          <label htmlFor='fromDate'>Desde</label>
          <input type='date' id='fromDate' name='fromDate' className='form-control' />
          <label htmlFor='toDate'>Hasta</label>
          <input type='date' id='toDate' name='toDate' className='form-control' />

          <button type='submit' className='btn btn-primary mt-3'>
            Buscar
          </button>
        </form>

        <div className='col'>
          <ReportsTable />
        </div>
      </div>
    </div>
  );
}
