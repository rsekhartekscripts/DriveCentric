import * as loginLocators from './../../HTMLElementSelectors/LoginLogout.json';

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
	cy.get(loginLocators.username_textbox).type(email).should('have.value', email)
	cy.get(loginLocators.password_textbox).type(password).should('have.value', password)
	
	// Click Login button
	cy.contains(loginLocators.login_button).should('be.visible').click()
	cy.wait(6000)
	
	//Verify SaleHome is opened
	cy.hash().should('eq','#/salesHome')
  })
})