import UsersForm from '../../components/users/UsersForm';
import UsersTable from '../../components/users/UsersTable';

export default function UsersView() {
  return (
    <div>
      <h2>Gestion de Usuarios</h2>
      <hr />
      <div className='row'>
        <UsersForm />
        <UsersTable />
      </div>
    </div>
  );
}
