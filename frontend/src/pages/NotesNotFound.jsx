import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";
import "./NotesNotFound.css";

const NotesNotFound = () => {
  return (
    <div className="notes-not-found">
      <div className="notes-icon-container">
        <NotebookIcon className="notes-icon" />
      </div>

      <h3 className="notes-title">
        No notes yet
      </h3>

      <p className="notes-description">
        Ready to organize your thoughts? Create your first note to get started
        on your journey.
      </p>

      <Link to="/create" className="create-note-button">
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;