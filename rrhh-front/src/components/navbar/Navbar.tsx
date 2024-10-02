import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<header className='d-flex justify-content-md-between flex-column flex-md-row align-items-center'>
			<h1>RR.HH</h1>

			<nav className='d-flex gap-3'>
				<Link to='/users' className='btn btn-light'>
					Usuarios
				</Link>
				<Link to='/timestamps' className='btn btn-light'>
					Marcaciones
				</Link>
				<Link to='/reports' className='btn btn-light'>
					Reportes
				</Link>
			</nav>
		</header>
	);
}
