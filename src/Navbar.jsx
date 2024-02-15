import './CSS/Navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <header>
      <nav>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <p>Registration</p>
            </Link>
            <Link style={{ textDecoration: "none", color: "white" }} to="/LogIn">
              <p>Log In</p>
            </Link>
      </nav>
    </header>
  );
};

export default Navbar;
