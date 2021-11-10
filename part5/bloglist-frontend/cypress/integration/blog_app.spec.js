describe('Blog app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST','http://localhost:3003/api/users', {username: 'test', name: 'test', password:'test123'} )
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
      cy.request('POST', 'http://localhost:3003/api/login', {username:'test', password: 'test123'})
      cy.get('#username').type('test')
      cy.get('#password').type('test123')
      cy.contains('login').click()
    })

    it('a blog can be created', function(){
      cy.get('#create').click()
      cy.get('#title').type('Un blog creado por Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.unaprueba.com')
      cy.get('#save').click()
      cy.get('.title').should('have.text', 'Un blog creado por Cypress')
    })

    it('a blog can be liked', function(){
      cy.get('#create').click()
      cy.get('#title').type('Un blog creado por Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.unaprueba.com')
      cy.get('#save').click()
      cy.get('.title').should('have.text', 'Un blog creado por Cypress')
      cy.contains('show').click()
      cy.get('.btn-like').click()
      cy.get('#likes').should('include.text', '1')

    })
  })

})