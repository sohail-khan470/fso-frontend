import Note from "./components/Note"
import { useEffect, useState } from "react"
import noteService from "./api/note-service"
import { ToastContainer,toast } from "react-toastify"

const App = () => {
  const [notes,setNotes] = useState([])
  const [newNote,setNewNote] = useState("");
  const [showAll,setShowAll] = useState(false);
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  useEffect(()=>{
    const getAll = async()=>{
      const notes = await noteService.getAll();
      setNotes(notes);
    }

    getAll();
  },[])



  const addNote = async(event)=>{
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    await noteService.create(noteObject);
    setNotes(notes.concat(noteObject));
    setNewNote("")

  }

  const handleNoteChange = (event)=>{
    setNewNote(event.target.value)
    console.log(event.target.value);
  }

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }


  const toggleImportance = async (id) => {
    const note = notes.find((n) => n.id === id);
    const updatedNote = { ...note, important: !note.important };
    await noteService.update(id, updatedNote);
    setNotes(notes.map((n) => (n.id === id ? updatedNote : n)));
  };

  const notesToShow = showAll ? notes : notes.filter((note)=>note.important === true)
  const notify = ()=>{toast("Notification working")}

  return (
    <div>
      <h1>Notes</h1>
      <ToastContainer/>
      <button onClick={notify}>notify</button>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
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



      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
            <Note note={note} key={note.id} toggleImportance={toggleImportance}/>
        )
        )}
      </ul>
      <form onSubmit={addNote}>
        <input onChange={handleNoteChange} value={newNote}/>
        <button type="submit">save</button>
      </form>   
    </div>
  )
}


export default App