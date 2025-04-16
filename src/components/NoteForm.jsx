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
      important: Math.floor(Math.random() * 10) > 5 ? true : false,
    };
    addNote(note);
    toast("Note Added Successfully");
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  if (error) {
    toast(error);
  }

  return (
    <div>
      <ToastContainer />
      <h2>Create a new note</h2>
      <form onSubmit={handleAddNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Note"}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
