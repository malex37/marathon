import { Link } from "react-router-dom";
import { routesConfig } from "../../Routes";

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
  </div>
)

export default Navbar;
