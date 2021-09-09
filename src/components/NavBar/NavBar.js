import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand">
          Heroes library
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/heroes'} className="nav-link">
              Heroes list
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/add'} className="nav-link">
              Add Hero
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
