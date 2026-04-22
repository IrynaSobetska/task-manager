import { Link } from "react-router-dom";
import "./Components.css";

const Header = () => {
  return (
    <div className="header">
      <Link className="logo" to="/">
        MintTask
      </Link>
      <div className="links">
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/project">Project</Link> */}
        {/* <Link to="/profile">Profile</Link> */}
      </div>
    </div>
  );
};

export default Header;
