import React, { useState } from "react";

const LoginForm = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
  {
    user && (
      <div>
        <p>{user.name} logged in</p>
        <Togglable buttonLabel="new note" ref={noteFormRef}>
          <NoteForm
            createNote={addNote}
            value={newNote}
            handleChange={handleNoteChange}
          />
        </Togglable>
      </div>
    );
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };
};

export default LoginForm;
