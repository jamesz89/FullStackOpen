import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm/> updates parent state with the correct inputs', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog}/>
  )
  component.debug()

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('.form')

  fireEvent.change(titleInput, { target: { value: 'Blog 10' } })
  fireEvent.change(authorInput, { target: { value: 'Mahoma' } })
  fireEvent.change(urlInput, { target: { value: 'https://www.mahomatambienlada.com' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Blog 10')
  expect(createBlog.mock.calls[0][0].author).toBe('Mahoma')
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.mahomatambienlada.com')
})