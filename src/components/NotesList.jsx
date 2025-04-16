import { useEffect, useState } from "react";
import Note from "./Note";
import noteService from "../api/note-service";
import { toast, ToastContainer } from "react-toastify";
import { useNotesStore } from "../store/notes-store";
import Spinner from "./Spinner";

function NotesList() {
  const [showAll, setShowAll] = useState(true);

  const { notes, fetchNotes, loading, addNote } = useNotesStore();

  useEffect(() => {
    fetchNotes();
  }, []);

  console.log(notes);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const notify = () => {
    toast("Notification working");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <ToastContainer />
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note note={note} key={note._id} />
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
