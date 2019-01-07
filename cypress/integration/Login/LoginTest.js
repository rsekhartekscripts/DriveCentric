import * as loginLocators from './../../HTMLElementSelectors/LoginLogout.json';

const email = Cypress.config('email');
const password = Cypress.config('password');
const loginValidationMsg='The email/password combination is not correct.'
const invalidUsername='drive'
const invalidPassword='centric'

describe('Drive Centric Login Verification', () => {
	
  beforeEach(() => {
	//Open the URL
    cy.visit('/')
	
	//Check the login page
	cy.url().should('include', '/login.aspx')
  })

it('Login Page Logo Verification', () => {
	cy.wait(4000)
	
	//Verification for DriveCentric Logo
	cy.get(loginLocators.drivecetric_logo).should('have.attr', 'alt', 'DriveCentric')
  })

  it('Login Without Username and Password', () => {
	//Click on Login Button
	cy.contains(loginLocators.login_button).should('be.visible').click()
	cy.wait(4000)
	//cy.contains(loginLocators.login_error_msg, loginValidationMsg)
	
	//Verification for loging validation message
	cy.get('.error').should('contain', loginValidationMsg)
  })

  it('Login With Valid Username and Without Password', () => {
	 
	//Enter Username
	cy.get(loginLocators.username_textbox).type(email).should('have.value', email)
	
	//Click on Login Button
	cy.contains(loginLocators.login_button).should('be.visible').click()
	cy.wait(4000)
	
	//Verification for loging validation message
	cy.contains(loginLocators.login_error_msg, loginValidationMsg)
  })
  
  it('Login Without Username With Valid Password', () => {
	//Enter Password
	cy.get(loginLocators.password_textbox).type(password).should('have.value', password)
	
	// Click Login Button
	cy.contains(loginLocators.login_button).should('be.visible').click()
	cy.wait(4000)
	
	//Verification for loging validation message
	cy.contains(loginLocators.login_error_msg, loginValidationMsg)
  })
  
   it('Login With Valid Username and Invalid Password', () => {
	//Enter Username and Password
	cy.get(loginLocators.username_textbox).type(email).should('have.value', email)
	cy.get(loginLocators.password_textbox).type(invalidPassword).should('have.value', invalidPassword)
	
	// Click Login Button
	cy.contains(loginLocators.login_button).should('be.visible').click()
	cy.wait(4000)
	
	//Verification for loging validation message
	cy.contains(loginLocators.login_error_msg, loginValidationMsg)
  })
  
  it('Login With Invalid Username With Valid Password', () => {
	//Enter Username and Password
	cy.get(loginLocators.username_textbox).type(invalidUsername).should('have.value', invalidUsername)
	cy.get(loginLocators.password_textbox).type(password).should('have.value', password)
	
	//Click on Login Button
	cy.contains(loginLocators.login_button).should('be.visible').click()
	cy.wait(4000)
	
	//Verification for loging validation message
	cy.contains(loginLocators.login_error_msg, loginValidationMsg)
  })
  
  it('Login With Invalid Username and Password', () => {
	 //Enter Username and Password
	cy.get(loginLocators.username_textbox).type(invalidUsername).should('have.value', invalidUsername)
	cy.get(loginLocators.password_textbox).type(invalidPassword).should('have.value', invalidPassword)
	
	//Click on Login Button
	cy.contains(loginLocators.login_button).should('be.visible').click()
	cy.wait(4000)
	
	//Verification for loging validation message
	cy.contains(loginLocators.login_error_msg, loginValidationMsg)
  })
  
  it('Login With Valid Username and Password', () => {
	//Enter Username and Password
	cy.get(loginLocators.username_textbox).type(email).should('have.value', email)
	cy.get(loginLocators.password_textbox).type(password).should('have.value', password)
	
	//Click on Login Button
	cy.contains(loginLocators.login_button).should('be.visible').click()
	cy.wait(10000)
	
	//Verification for Home Url and Page Title
	cy.hash().should('eq','#/salesHome')
	cy.title().should('contain', 'Home / DriveCentric');
  })
})
