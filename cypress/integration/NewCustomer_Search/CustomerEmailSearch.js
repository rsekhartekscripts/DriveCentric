const email = Cypress.config('email');
const password = Cypress.config('password');

const addNewCustomer_button = '[data-test=header-li-newcustomer]'
const email_textbox = '[placeholder=Email]'
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
	cy.get(email_textbox).focus().type('{esc}')
	
	//Logout from application
	cy.wait(3000)
    cy.logout()
  })
  
  
  it('Customer Email Search ', function() {
	//Enter Email
	cy.get(email_textbox).clear().type('illonetruly@gmail.com').should('have.value', 'illonetruly@gmail.com')
	cy.wait(10000)
	
	//Assert Email Results
	//cy.get('[ng-if*="result.Email"]').contains('illonetruly@gmail.com')
	cy.get(email_result).invoke('text').then((text) => {
    expect('illonetruly@gmail.com').equal(text.trim())
})
  })
  
 