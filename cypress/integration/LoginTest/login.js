const email = Cypress.config('email');
const password = Cypress.config('password');
describe('Drive Cetric Login', function() {
  it('Successfull Login', function() {
	 //Clear Cookies
	 cy.clearCookies()
	//Open URL and Verify Login Page
    cy.visit('baseUrl')
	cy.url().should('include', '/login.aspx')
	
	//Enter Username and Password
	cy.get('[name=inputEmail]').type(email).should('have.value', email)
	cy.get('[name=inputPassword]').type(password).should('have.value', password)
	
	// Click Logins
	cy.contains('Login').should('be.visible').click()
	cy.wait(60000)
	
	//Verify SaleHome is opened
	cy.hash().should('eq','#/salesHome')
  })
})