import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="app-background"></div>

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/create" element={<CreatePage />} />

        <Route
          path="/note/:id"
          element={<NoteDetailPage />}
        />
      </Routes>
    </div>
  );
};

export default App;