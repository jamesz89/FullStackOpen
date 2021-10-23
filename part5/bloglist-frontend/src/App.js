import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setlikes] = useState(0);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      displayErrorMessage("username or password is invalid");
      console.log(exception);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    console.log("logging out");
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value);
  };

  const handleUrlChange = ({ target }) => {
    setUrl(target.value);
  };

  const displayMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const displayErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const togglableRef = useRef()

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      console.log("adding blog to list");
      togglableRef.current.toggleVisibility()
      const newBlog = await blogService.create({ title, author, url, likes });
      setBlogs(blogs.concat(newBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      console.log("new entry added");
      displayMessage(`A blog named "${title}" by ${author} has beed added`);
    } catch (exception) {
      console.log(exception);
    }
  };

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserToken) {
      const user = JSON.parse(loggedUserToken);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorMessage} type="error" />
        <form onSubmit={handleLogin}>
          <label>username</label>
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <label>password</label>
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} is logged in</p>
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
      <Togglable buttonLabel="create a new blog" ref={togglableRef}>
      <BlogForm
        title={title}
        author={author}
        url={url}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        createBlog={createBlog}
      />
      </Togglable>
      <Notification message={errorMessage} type="error" />
      <Notification message={message} type="success" />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
export default App;
