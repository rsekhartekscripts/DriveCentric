const email = Cypress.config('email');
const password = Cypress.config('password');

const addNewCustomer_button = '[data-test=header-li-newcustomer]'
const firstName_textbox = '#newFirstName'
const lastName_textbox = '#newLastName'
const firstName_result = '[ng-if*="result.CustomerFirstName"]'
const lastName_result = '[ng-if*="result.CustomerLastName"]'

	
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
  
  
  it('Customer First & Last Name Search ', function() {
	 //Enter First Name
	cy.get(firstName_textbox).clear().type('Roger').should('have.value', 'Roger')
	
	//Enter Last Name
	cy.get(lastName_textbox).clear().type('Schwartz').should('have.value', 'Schwartz')
	cy.wait(4000)
	
	//cy.get('span span[ng-if="result.CustomerFirstName != \'\'"]').contains('Roger')
	//Assert for First and Last Name Verification
	cy.get(firstName_result).invoke('text').then((text) => {
    expect('Roger').equal(text.trim())
	})
	cy.get(lastName_result).invoke('text').then((text) => {
    expect('Schwartz').equal(text.trim())
	})
 })
  
 