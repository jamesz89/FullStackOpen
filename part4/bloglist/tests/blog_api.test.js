const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

describe('blog format validation', () => {
  test('blogs are returned in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are the correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('each blog has its own ID', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('blogs are created correctly', () => {
  test('a new blog can be added', async () => {

    const newBlog = {
      title: 'Api testing #1',
      author: 'James',
      url: 'http://blogapitest1.example.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length + 1)

    expect(response.body.slice(-1)[0].title).toBe(newBlog.title)
    expect(response.body.slice(-1)[0].author).toBe(newBlog.author)
    expect(response.body.slice(-1)[0].url).toBe(newBlog.url)
    expect(response.body.slice(-1)[0].likes).toBe(newBlog.likes)
  })

  test('new blog has property likes defined', async () => {
    const newBlog = {
      title: 'Api testing #1',
      author: 'James',
      url: 'http://blogapitest1.example.com',
    }

    const response = await api.post('/api/blogs').send(newBlog)
    if (newBlog.likes === undefined) {
      expect(response.body.likes).toBe(0)
    }
  })
})

afterAll(() => {
  mongoose.connection.close()
})