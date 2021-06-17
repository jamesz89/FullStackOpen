const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('User creation is correct', () => {
  test('username and password are included', async () => {

    const incompleteUser = {
      name: 'Luffy'
    }

    await api
      .post('/api/users')
      .send(incompleteUser)
      .expect(400)
      .expect({
        username: 'body[username]: Invalid value',
        password: 'body[password]: Invalid value'
      })
  })

  test('username contains at least 3 characters', async () => {
    const badUser = {
      username: 'ok',
      name: 'Luffy',
      password: '123456789'
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
      .expect({ username: 'body[username]: Invalid value' })
  })

  test('password contains at least 3 characters', async () => {
    const badUser = {
      username: 'Luffy777',
      name: 'Luffy',
      password: '12'
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
      .expect({ password: 'body[password]: Invalid value' })
  })
})

afterAll(() => {
  mongoose.connection.close()
})