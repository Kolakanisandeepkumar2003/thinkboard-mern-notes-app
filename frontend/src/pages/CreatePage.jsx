import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import "./CreatePage.css";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);

      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <div className="create-container">
        <div className="create-content">

          <Link to="/" className="back-button">
            <ArrowLeftIcon className="back-icon" />
            <span>Back to Notes</span>
          </Link>

          <div className="create-card">
            <div className="create-card-body">

              <h2 className="create-title">
                Create New Note
              </h2>

              <form onSubmit={handleSubmit}>

                {/* Title */}
                <div className="form-group">
                  <label htmlFor="title">
                    Title
                  </label>

                  <input
                    id="title"
                    type="text"
                    placeholder="Note Title"
                    className="form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content */}
                <div className="form-group">
                  <label htmlFor="content">
                    Content
                  </label>

                  <textarea
                    id="content"
                    placeholder="Write your note here..."
                    className="form-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Submit */}
                <div className="form-actions">
                  <button
                    type="submit"
                    className="create-button"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;