import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Blog de prueba',
    author: 'Jesucristo',
    url: 'https://www.jesusvivelaluchasigue.com',
    likes: 12
  }
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
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

})