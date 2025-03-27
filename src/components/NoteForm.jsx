import { useState } from "react";
import { useAddNoteMutation } from "../redux/api";
import { toast, ToastContainer } from "react-toastify";

const NoteForm = () => {
  const [newNote, setNewNote] = useState("");
  const [addNote, { isLoading }] = useAddNoteMutation();

  const handleAddNote = async (event) => {
    event.preventDefault();
    try {
      await addNote({ content: newNote, important: false }).unwrap();
      setNewNote("");
    } catch (err) {
      console.error("Failed to add note:", err);
    }
    toast("Note added successfully");
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <ToastContainer />
      <h2>Create a new note</h2>
      <form onSubmit={handleAddNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Note"}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
