import { useNotesStore } from "../store/notes-store";
import Spinner from "./Spinner";

const Note = ({ note }) => {
  const { notes, fetchNotes, loading, updateNote } = useNotesStore();

  const label = note.important ? "make not important" : "make important";
  const updatedNote = { ...note, important: !note.important };

  const handleUpdateNote = async () => {
    await updateNote(note._id, updatedNote);
    fetchNotes();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <li>
      {note.content + "  "}
      <button onClick={handleUpdateNote}>{label}</button>
    </li>
  );
};

export default Note;
