import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersView from './views/users/users.view';
import Layout from './components/layout/Layout';
import UsersEdit from './views/users/users.edit';
import TimestampsView from './views/timestamps/timestamps.view';
import ReportsView from './views/reports/reports.view';

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Usuarios */}
            <Route path='/users' element={<UsersView />} />
            <Route path='/users/:id/edit' element={<UsersEdit />} />

            {/* Marcaciones */}
            <Route path='/timestamps' element={<TimestampsView />} />

            {/* reportes */}
            <Route path='/reports' element={<ReportsView />} />

            {/* Default */}
            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
