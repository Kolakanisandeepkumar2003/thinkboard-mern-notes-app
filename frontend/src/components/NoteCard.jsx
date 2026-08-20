import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import "./NoteCard.css";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);

      setNotes((prev) => prev.filter((note) => note._id !== id));

      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link to={`/note/${note._id}`} className="note-card">
      <div className="note-card-body">

        <h3 className="note-title">
          {note.title}
        </h3>

        <p className="note-content">
          {note.content}
        </p>

        <div className="note-card-actions">

          <span className="note-date">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="note-buttons">
            <PenSquareIcon className="edit-icon" />

            <button
              className="delete-button"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="delete-icon" />
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default NoteCard;