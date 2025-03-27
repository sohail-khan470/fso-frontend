import { useEffect, useState } from "react";
import Note from "./Note";
import noteService from "../api/note-service";
import { useGetNotesQuery } from "../redux/api";
import { toast } from "react-toastify";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const { data: allNotes, isLoading, isError, error } = useGetNotesQuery();
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    if (allNotes) {
      setNotes(allNotes);
    }
  }, [allNotes]); // ✅ Corrected dependency

  console.log(notes);

  const toggleImportance = async (id) => {
    try {
      const note = notes.find((n) => n._id === id);
      if (!note) return;

      const updatedNote = { ...note, important: !note.important };
      console.log(id, updatedNote);

      await noteService.update(id, updatedNote);
      setNotes(notes.map((n) => (n._id === id ? updatedNote : n)));
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note.");
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const notify = () => {
    toast("Notification working");
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            note={note}
            key={note._id}
            toggleImportance={toggleImportance}
          />
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
