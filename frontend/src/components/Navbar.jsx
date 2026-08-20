import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">

          <h1 className="navbar-logo">
            ThinkBoard
          </h1>

          <div className="navbar-actions">
            <Link to="/create" className="new-note-button">
              <PlusIcon className="plus-icon" />
              <span>New Note</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;