import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Blog de prueba',
    author: 'Jesucristo',
    url: 'https://www.jesusvivelaluchasigue.com',
    likes: 12
  }

  const blogs = [
    {
      title: 'Blog de prueba 2',
      author: 'Jesucristo',
      url: 'https://www.jesusvivelaluchasigue.com',
      likes: 4
    },
    {
      title: 'Blog de prueba 3',
      author: 'Jesucristo',
      url: 'https://www.jesusvivelaluchasigue.com',
      likes: 8
    },
    {
      title: 'Blog de prueba 4',
      author: 'Jesucristo',
      url: 'https://www.jesusvivelaluchasigue.com',
      likes: 21
    }
  ]
  const setBlogsMockHandler = jest.fn()
  const handleUpdateBlogMockHandler = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog}
        blogs={blogs}
        setBlogs={setBlogsMockHandler}
        handleUpdateBlog={handleUpdateBlogMockHandler} />
    )
  })

  test('renders title', () => {
    expect(component.container.querySelector('.title')).toHaveTextContent('Blog de prueba')
  })

  test('renders author', () => {
    expect(component.container.querySelector('.author')).toHaveTextContent('Jesucristo')
  })

  test('do not show details by default', () => {
    expect(component.container.querySelector('.blog-details')).toHaveStyle('display : none')
  })

  test('shows likes after show button is clicked', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog-details')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the button twice calls the event handler twice' , () => {
    const button = component.container.querySelector('.btn-like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(handleUpdateBlogMockHandler.mock.calls).toHaveLength(2)
  })
})