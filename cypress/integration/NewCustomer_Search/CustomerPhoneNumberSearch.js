const email = Cypress.config('email');
const password = Cypress.config('password');

const addNewCustomer_button = '[data-test=header-li-newcustomer]'
const phone_textbox = '#newPhone'
const phone_result = '[ng-class*="result.CellPhone"]'
	
  before(function () {
	//Login to the application
    cy.login(email, password)
	
	//Click on the add new customer button
	cy.get(addNewCustomer_button).should('be.visible').click()
	cy.wait(4000)
  })
    
  after(function () {
	//Close the New Customer Window With Escape button
	cy.get(phone_textbox).focus().type('{esc}')
	
	//Logout from application
	cy.wait(3000)
    cy.logout()
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
  
 