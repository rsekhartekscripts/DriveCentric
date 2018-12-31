describe('logged in user', function () {
	
  beforeEach(function () {
    cy.login('enterprise1@drivecentric.com', 'enterprise1')
  })
  
it('Dummy test', () => {
	cy.wait(4000)
	cy.log("Hello World!!!")
  })
  
  afterEach(function () {
    cy.logout()
  })
})