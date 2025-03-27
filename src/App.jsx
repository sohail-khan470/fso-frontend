import Note from "./components/Note";
import { useEffect, useState, useRef } from "react";
import noteService from "./api/note-service";
import { ToastContainer, toast } from "react-toastify";
NotesList;
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";

const App = () => {
  const [newNote, setNewNote] = useState("");

  const noteFormRef = useRef();

  return (
    <div>
      <h1>Notes</h1>
      <br />
      <NoteForm />
      <NotesList />
      <ToastContainer />
    </div>
  );
};

export default App;
