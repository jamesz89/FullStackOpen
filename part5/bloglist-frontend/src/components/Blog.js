import React, { useState } from "react";
const Blog = ({ blog, updateBlog, deleteBlog, blogs, setBlogs, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showWhenVisible = { display: showDetails ? "" : "none" };

  const addLike = () => {
    const blogToUpdate = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    const updatedBlogs = [...blogs];
    const blogIndex = updatedBlogs.findIndex(
      (currentBlog) => currentBlog.id === blog.id
    );
    updatedBlogs.splice(blogIndex, 1, blogToUpdate);
    setBlogs(updatedBlogs);
    updateBlog(blogToUpdate);
  };

  const removeBlog = () => {
    const updatedBlogs = [...blogs];
    const blogIndex = updatedBlogs.findIndex(
      (currentBlog) => currentBlog.id === blog.id
    );
    if (window.confirm(`Do you want to delete the blog "${blog.title}?`)) {
      updatedBlogs.splice(blogIndex, 1);
      setBlogs(updatedBlogs);
      deleteBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title}</span>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "show"}
        </button>
        <div style={showWhenVisible}>
          <span>{blog.url}</span>
          <br />
          <span>{blog.likes} likes </span>
          <button onClick={addLike}>like</button>
          <br />
          <span>{blog.author}</span>
          <br />
          {blog.user.username === user.username ? <button onClick={removeBlog}>remove</button> : null}
        </div>
      </div>
    </div>
  );
};

export default Blog;
