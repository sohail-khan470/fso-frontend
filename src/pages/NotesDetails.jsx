import Spinner from "../components/Spinner";
import { useNotesStore } from "../store/notes-store";

const NoteDetails = ({ note }) => {
  const { loading, updateNote, fetchNotes } = useNotesStore();

  const label = note.important ? "Make Not Important" : "Make Important";
  const updatedNote = { ...note, important: !note.important };

  const handleUpdateNote = async () => {
    await updateNote(note._id, updatedNote);
    fetchNotes();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <li className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg border border-gray-200">
      <span className="text-gray-800">{note.content}</span>
      <button
        onClick={handleUpdateNote}
        className={`px-3 py-1 text-sm font-medium rounded 
          ${note.important 
            ? "bg-red-100 text-red-700 hover:bg-red-200" 
            : "bg-green-100 text-green-700 hover:bg-green-200"} 
          transition duration-200`}
      >
        {label}
      </button>
    </li>
  );
};

export default NoteDetails;
