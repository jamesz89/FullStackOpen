/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 'There are not any blogs yet'
  }
  const sortedBlogs = blogs.sort((a, b) => {
    return a.likes - b.likes
  })
  return sortedBlogs.reverse()[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}