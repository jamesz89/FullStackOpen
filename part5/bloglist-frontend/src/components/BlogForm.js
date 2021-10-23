import React from "react";

const BlogForm = ({
  blogFormVisible,
  createBlog,
  handleBlogFormVisibility,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url, 
}) => {
  const  hideWhenVisible = {display: blogFormVisible ? 'none' : ''}
  const  showWhenVisible = {display: blogFormVisible ? '' : 'none'}

  return (
    <div> 
    <button style={showWhenVisible} type="submit" onClick={handleBlogFormVisibility}>create a new blog</button>
    <form style={hideWhenVisible} onSubmit={createBlog}>
      <h2>Create new entry</h2>
      <label name="title">title</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleTitleChange}
      />
      <br />
      <label name="author">author</label>
      <input
        type="text"
        name="author"
        value={author}
        onChange={handleAuthorChange}
      />
      <br />
      <label name="url">url</label>
      <input type="text" name="url" value={url} onChange={handleUrlChange} />
      <br />
      <button type="submit">create</button>
      <button onClick={handleBlogFormVisibility} type="submit">cancel</button>
    </form>
    </div>
  );
};

export default BlogForm;
