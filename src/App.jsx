import React, { useEffect, useState, useRef } from "react";
import noteService from "./api/note-service";
import { ToastContainer, toast } from "react-toastify";
import NoteForm from "./components/NoteForm";
import NotesList from "./pages/NoteList";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <h1>Notes</h1>
      <br />
      <NoteForm />
      <NotesList />
    </div>
  );
};

export default App;
