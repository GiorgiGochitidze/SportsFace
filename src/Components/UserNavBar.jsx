import "../CSS/Navbar.css";
import { useNavigate } from "react-router-dom";

const UserNavBar = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <p>Main</p>
        <p onClick={() => navigate('/')}>Log Out</p>
      </nav>
    </header>
  );
};

export default UserNavBar;
