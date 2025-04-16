import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNotesStore } from "../store/notes-store";

const NoteForm = () => {
  const { addNote, loading, error } = useNotesStore();
  const [newNote, setNewNote] = useState("");

  const handleAddNote = async (event) => {
    event.preventDefault();
    const note = {
      content: newNote,
      important: Math.floor(Math.random() * 10) > 5,
    };
    addNote(note);
    toast.success("Note added successfully");
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  if (error) {
    toast.error(error);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        📝 Create a New Note
      </h2>
      <form onSubmit={handleAddNote} className="flex flex-col space-y-4">
        <input
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your note here..."
          value={newNote}
          onChange={handleNoteChange}
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add Note"}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
