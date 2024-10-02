import TimestampsForm from '../../components/timestamps/TimestampsForm';
import TimestampsTable from '../../components/timestamps/TimestampsTable';

export default function TimestampsView() {
  return (
    <div>
      <h2>Registro de Marcaciones</h2>
      <hr />
      <div className='row'>
        <TimestampsForm />
		<TimestampsTable/>
      </div>
    </div>
  );
}
