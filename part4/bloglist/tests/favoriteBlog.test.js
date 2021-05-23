const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const emptyList = []

  test('when list is empty it should return message', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toBe('There are not any blogs yet')
  })

  const listWithOneBlog = [
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 10,
    }
  ]

  const onlyBlog =  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    likes: 10,
  }

  test('when list has one item return that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(onlyBlog)
  })

  const fullList = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 10,
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      likes: 0,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      likes: 2,
    }
  ]

  const mostLikedBlog =  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
  }

  test('when list is bigger return the one with most likes', () => {
    const result = listHelper.favoriteBlog(fullList)
    expect(result).toEqual(mostLikedBlog)
  })
})