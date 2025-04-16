import { Outlet, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <div>
      <ToastContainer />
      <nav>
        <h1>Notes App</h1>
        <Link to="/">Home</Link> | 
        <Link to="/notes">Notes</Link> | 
        <Link to="/login">Login</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;