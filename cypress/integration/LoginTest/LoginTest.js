/// <reference types="Cypress" />
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
	cy.get('.driveLogo h2 img').should('have.attr', 'alt', 'DriveCentric')
  })

  it('Login Without Username and Password', () => {
	  
	 //Click on Login Button
	cy.contains('Login').click()
	cy.wait(4000)
	//cy.contains('p', loginValidationMsg)
	
	//Verification for loging validation message
	cy.get('.error').should('contain', loginValidationMsg)
  })

  it('Login With Valid Username and Without Password', () => {
	 
	 //Enter Username
	cy.get('[name=inputEmail]').type(email).should('have.value', email)
	
	//Click on Login Button
	cy.contains('Login').click()
	cy.wait(4000)
	
	//Verification for loging validation message
	cy.contains('p', loginValidationMsg)
  })
  
  it('Login Without Username With Valid Password', () => {
	//Enter Password
	cy.get('[name=inputPassword]').type(password).should('have.value', password)
	
	// Click Login Button
	cy.contains('Login').click()
	cy.wait(4000)
	
	//Verification for loging validation message
	cy.contains('p', loginValidationMsg)
  })
  
   it('Login With Valid Username and Invalid Password', () => {
	//Enter Username and Password
	cy.get('[name=inputEmail]').type(email).should('have.value', email)
	cy.get('[name=inputPassword]').type(invalidPassword).should('have.value', invalidPassword)
	
	// Click Login Button
	cy.contains('Login').click()
	cy.wait(4000)
	cy.contains('p', loginValidationMsg)
  })
  
  it('Login With Invalid Username With Valid Password', () => {
	 //Enter Username and Password
	cy.get('[name=inputEmail]').type(invalidUsername).should('have.value', invalidUsername)
	cy.get('[name=inputPassword]').type(password).should('have.value', password)
	
	//Click on Login Button
	cy.contains('Login').click()
	cy.wait(4000)
	
	//Verification for loging validation message
	cy.contains('p', loginValidationMsg)
  })
  
  it('Login With Invalid Username and Password', () => {
	 //Enter Username and Password
	cy.get('[name=inputEmail]').type(invalidUsername).should('have.value', invalidUsername)
	cy.get('[name=inputPassword]').type(invalidPassword).should('have.value', invalidPassword)
	
	//Click on Login Button
	cy.contains('Login').click()
	cy.wait(4000)
	
	//Verification for loging validation message
	cy.contains('p', loginValidationMsg)
  })
  
  it('Login With Valid Username and Password', () => {
	 //Enter Username and Password
	cy.get('[name=inputEmail]').type(email).should('have.value', email)
	cy.get('[name=inputPassword]').type(password).should('have.value', password)
	
	//Click on Login Button
	cy.contains('Login').click()
	cy.wait(10000)
	
	//Verification for loging validation message
	cy.hash().should('eq','#/salesHome')
  })
})
