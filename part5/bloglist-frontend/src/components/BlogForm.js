import React from "react";

const BlogForm = ({
  createBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <form onSubmit={createBlog}>
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
    </form>
  );
};

export default BlogForm;
