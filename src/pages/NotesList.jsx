import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNotesStore } from "../store/notes-store";
import Spinner from "../components/Spinner";
import NotesDetails from "./NotesDetails";

function NotesList() {
  const [showAll, setShowAll] = useState(true);
  const { notes, fetchNotes, loading, addNote } = useNotesStore();

  useEffect(() => {
    fetchNotes();
  }, []);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const notify = () => {
    toast.success("Notification working");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
        Notes
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Show {showAll ? "important" : "all"}
        </button>
      </div>

      <ul className="space-y-4">
        {notesToShow.map((note) => (
          <NotesDetails note={note} key={note._id} />
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
