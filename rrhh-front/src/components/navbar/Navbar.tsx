import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className='d-flex justify-content-md-between flex-column flex-md-row align-items-center'>
      <h1>RR.HH</h1>

      <nav className='d-flex gap-2'>
        <Link to='/users'>Usuarios</Link>
        <Link to='/timestamps'>Marcaciones</Link>
        <Link to='/reports'>Reportes</Link>
      </nav>
    </header>
  );
}
