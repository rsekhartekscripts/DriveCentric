const email = Cypress.config('email');
const password = Cypress.config('password');

const addNewCustomer_button = '[data-test=header-li-newcustomer]'
const firstName_textbox = '#newFirstName'
const lastName_textbox = '#newLastName'
const phone_textbox = '#newPhone'
const email_textbox = '[placeholder=Email]'
const firstName_result = '[ng-if*="result.CustomerFirstName"]'
const lastName_result = '[ng-if*="result.CustomerLastName"]'
const phone_result = '[ng-class*="result.CellPhone"]'
const email_result = '[ng-if*="result.Email"]'

  before(function () {
	//Login to the application
    cy.login(email, password)
	
	//Click on the add new customer button
	cy.get(addNewCustomer_button).should('be.visible').click()
	cy.wait(4000)
  })
    
  after(function () {
	//Close the New Customer Window With Escape button
	cy.get(firstName_textbox).focus().type('{esc}')
	
	//Logout from application
	cy.wait(3000)
    cy.logout()
  })
  
  
  
  it('Customer First Name Search ', function() {
	//Enter FirstName
	cy.get(firstName_textbox).clear().type('Roger').should('have.value', 'Roger')
	cy.wait(5000)
	
	//Assert search Results
	//cy.get('span span[ng-if="result.CustomerFirstName != \'\'"]').contains('Roger')
	cy.get(firstName_result).invoke('text').then((text) => {
    expect('Roger').equal(text.trim())
	})
  })
  
  it('Customer Last Name Search ', function() {
	//Enter LastName
	cy.get(lastName_textbox).clear().type('Schwartz').should('have.value', 'Schwartz')
	cy.wait(5000)
	
	//Assert LastName
	//cy.get('span span[ng-if="result.CustomerLastName != \'\'"]').contains('Schwartz')
	cy.get(lastName_result).invoke('text').then((text) => {
    expect('Schwartz').equal(text.trim())
	})
  })
  
  it('Customer Phone Number Search ', function() {
	//Enter Phone Number
	cy.get(phone_textbox).clear().type('(314) 600-0681').should('have.value', '(314) 600-0681')
	cy.wait(10000)
	
	//Assert Phone Number
	//cy.get('[ng-class*="result.CellPhone"]').contains('(314) 600-0681')
	cy.get(phone_result).invoke('text').then((text) => {
    expect('(314) 600-0681').equal(text.trim())
	})
  })
  
  it('Customer Email Search ', function() {
	//Enter Email
	cy.get(email_textbox).clear().type('illonetruly@gmail.com').should('have.value', 'illonetruly@gmail.com')
	cy.wait(10000)
	
	//Assert Email
	//cy.get('[ng-if*="result.Email"]').contains('illonetruly@gmail.com')
	cy.get(email_result).invoke('text').then((text) => {
    expect('illonetruly@gmail.com').equal(text.trim())
	})
  })