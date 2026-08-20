import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import {
  ArrowLeftIcon,
  LoaderIcon,
  Trash2Icon,
} from "lucide-react";
import "./NoteDetailPage.css";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);

        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Delete note
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await api.delete(`/notes/${id}`);

      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  // Save note
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);

      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="note-detail-loading">
        <LoaderIcon className="loading-icon" />
      </div>
    );
  }

  // If note couldn't be loaded
  if (!note) {
    return (
      <div className="note-detail-loading">
        <p>Note not found.</p>
      </div>
    );
  }

  return (
    <div className="note-detail-page">
      <div className="note-detail-container">
        <div className="note-detail-content">

          {/* Header */}
          <div className="note-detail-header">

            <Link to="/" className="back-button">
              <ArrowLeftIcon className="action-icon" />
              <span>Back to Notes</span>
            </Link>

            <button
              onClick={handleDelete}
              className="delete-button"
            >
              <Trash2Icon className="action-icon" />
              <span>Delete Note</span>
            </button>

          </div>

          {/* Note Card */}
          <div className="note-card">
            <div className="note-card-body">

              {/* Title */}
              <div className="form-group">
                <label htmlFor="note-title">
                  Title
                </label>

                <input
                  id="note-title"
                  type="text"
                  placeholder="Note title"
                  className="form-input"
                  value={note.title}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              {/* Content */}
              <div className="form-group">
                <label htmlFor="note-content">
                  Content
                </label>

                <textarea
                  id="note-content"
                  placeholder="Write your note here..."
                  className="form-textarea"
                  value={note.content}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      content: e.target.value,
                    })
                  }
                />
              </div>

              {/* Save */}
              <div className="save-actions">
                <button
                  className="save-button"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;