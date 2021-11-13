describe('Blog app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST','http://localhost:3003/api/users', { username: 'test', name: 'test', password:'test123' } )
    cy.visit('http://localhost:3000')
  })

  it('displays login form by default', function() {
    cy.contains('log in to application')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test123')
      cy.contains('login').click()
      cy.contains('Blogs')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('test1235')
      cy.contains('login').click()
      cy.contains('username or password is invalid')
    })

    it('when failed login notification is displayed in red', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('test1235')
      cy.contains('login').click()
      cy.contains('username or password is invalid').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'test', password: 'test123' })
    })

    it('a blog can be created', function(){
      cy.get('#create').click()
      cy.get('#title').type('Un blog creado por Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.unaprueba.com')
      cy.get('#save').click()
      cy.get('.title').should('have.text', 'Un blog creado por Cypress')
    })

    describe('and a blog exists', function(){
      beforeEach(function(){
        cy.createBlog({
          title: 'Test1',
          author: 'Cypress',
          url: 'http://www.test1.com',
          likes: 0
        })
      })

      it('it can be liked', function(){
        cy.contains('show').click()
        cy.get('.btn-like').click()
        cy.get('.likes').should('include.text', '1')
      })

      it('it can be deleted', function(){
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.get('.title').should('not.exist')
      })
    })
    describe('and there are several blogs', function(){
      beforeEach(function(){
        cy.createBlog({
          title: 'Test1',
          author: 'Cypress',
          url: 'http://www.test1.com',
          likes: 10
        })
        cy.createBlog({
          title: 'Test2',
          author: 'Cypress',
          url: 'http://www.test2.com',
          likes: 50
        })
        cy.createBlog({
          title: 'Test3',
          author: 'Cypress',
          url: 'http://www.test3.com',
          likes: 25
        })
      })

      it('are sorted by number of likes', function(){
        cy.get('.blog .likes').then($blogs => {
          let amountOfLikes = [...$blogs].map(blog => blog.innerText)
          expect(amountOfLikes).to.deep.equal([...amountOfLikes].sort((a,b) => b - a))
        })
      })
    })
  })
})