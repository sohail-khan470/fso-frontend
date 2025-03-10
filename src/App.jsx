import Note from "./components/Note";
import { useEffect, useState } from "react";
import noteService from "./api/note-service";
import { ToastContainer, toast } from "react-toastify";
import userService from "./api/user-service";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);


  useEffect(() => {
    const getAll = async () => {
      const notes = await noteService.getAll();
      setNotes(notes);
    };

    getAll();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);




  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    await noteService.create(noteObject);
    setNotes(notes.concat(noteObject));
    toast("Note added successfully");
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleUsernameChange = (e)=>{
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e)=>{
    setPassword(e.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await userService.login({ username, password });
    window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
    noteService.setToken(user.token);
    setUser(user);
    if (!user) {
      toast("Invalid Credentials please try again");
    }
    setUsername("");
    setPassword("");

    if (user) {
      toast(`Logging in with the user ${user.username}`);
    }
  };

  const toggleImportance = async (id) => {
    const note = notes.find((n) => n._id === id);
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


  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  return (
    <div>
      <h1>Notes</h1>
      <ToastContainer />
      <button onClick={notify}>notify</button>

      {!user ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      ) : (
        <div>
          {/* <p>{user.name} logged-in</p> */}
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
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
};

export default App;
