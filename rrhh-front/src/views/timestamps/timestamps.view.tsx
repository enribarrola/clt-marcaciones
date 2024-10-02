import TimestampsForm from '../../components/timestamps/TimestampsForm';

export default function TimestampsView() {
  return (
    <div>
      <h2>Registro de Marcaciones</h2>
      <hr />
      <div className='row'>
        <TimestampsForm />
      </div>
    </div>
  );
}
