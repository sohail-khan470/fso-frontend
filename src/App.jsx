import Note from "./components/Note";
import { useEffect, useState } from "react";
import noteService from "./api/note-service";
import { ToastContainer, toast } from "react-toastify";
import userService from "./api/user-service";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  console.log(notes)

  useEffect(() => {
    const getAll = async () => {
      const notes = await noteService.getAll();
      setNotes(notes);
    };

    getAll();
  }, []);

  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    await noteService.create(noteObject);
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };


  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await userService.login({ username, password });
    noteService.setToken(user.token);
    setUser(user);
    if(!user){
      toast("Invalid Credentials please try again")
    }
    setUsername("");
    setPassword("");

    if(user){
      toast(`Logging in with the user ${user.username}`)
    }
  };

  const toggleImportance = async (id) => {
    const note = notes.find((n) => n._id === id);
    console.log(note)
    const updatedNote = { ...note, important: !note.important };
    await noteService.update(id, updatedNote);
    setNotes(notes.map((n) => (n._id === id ? updatedNote : n)));
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);
  const notify = () => {
    toast("Notification working");
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };
  const noteForm = () => {
    return (
      <div>
        <h2>Add Note</h2>
        <form onSubmit={addNote}>
          <input onChange={handleNoteChange} value={newNote} />
          <button type="submit">save</button>
        </form>
      </div>
    );
  };
  return (
    <div>
      <h1>Notes</h1>
      <ToastContainer />
      <button onClick={notify}>notify</button>

      {!user  ? loginForm()  :
      <div>
        {/* <p>{user.name} logged-in</p> */}
        {noteForm()}
      </div>}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note note={note} key={note._id} toggleImportance={toggleImportance} />
        ))}
      </ul>
    </div>
  );
};

export default App;
