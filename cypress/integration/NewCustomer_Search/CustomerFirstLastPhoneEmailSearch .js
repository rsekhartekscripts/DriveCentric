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
	  //Load the custom details search data
	//cy.fixture('customer_details.json').as('customerSearch')
	
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
		
	//Enter Phone
	cy.get(phone_textbox).clear().type('(314) 600-0681').should('have.value', '(314) 600-0681')
	
	//Enter Email
	cy.get(email_textbox).clear().type('illonetruly@gmail.com').should('have.value', 'illonetruly@gmail.com')
	cy.wait(10000)
	
	//cy.get('span span[ng-if="result.CustomerFirstName != \'\'"]').contains('Roger')
	//Assert for First, Last Name, Phone Number and Email Verification
	cy.get(firstName_result).invoke('text').then((text) => {
    expect('Roger').equal(text.trim())
	})
	cy.get(lastName_result).invoke('text').then((text) => {
    expect('Schwartz').equal(text.trim())
	})
	cy.get(phone_result).invoke('text').then((text) => {
    expect('(314) 600-0681').equal(text.trim())
	})
	cy.get(email_result).invoke('text').then((text) => {
    expect('illonetruly@gmail.com').equal(text.trim())
    })
  })
  
 