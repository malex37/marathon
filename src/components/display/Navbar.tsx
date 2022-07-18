import { Link } from 'react-router-dom';
import { routesConfig } from '../../Routes';
import Avatar from './Avatar';

const links = routesConfig.filter(({ isNavLinkVisible }) => isNavLinkVisible);

const Navbar = () => (
  <div className="navbar bg-base-100">
    <div className="navbar-start" />
    <div className="navbar-center">
      {links.map(({ path, navLinkName }, index) => (
        <Link
          to={path}
          key={index}
          className="btn btn-ghost normal-case text-xl"
        >
          {navLinkName}
        </Link>
      ))}
    </div>
    <div className="navbar-end" />
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="btn btn-ghost rounded-btn flex-nowrap p-3">
        <Avatar firstName="John" lastName="Doe" username="JonnyDoe" />
      </div>
      <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
        {
          // This menu should probably be a component
        }
        <li><Link to='/logout'>Logout</Link></li>
      </ul>
    </div>
  </div>
);

export default Navbar;
