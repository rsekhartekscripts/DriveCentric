const email = Cypress.config('email');
const password = Cypress.config('password');

const addNewCustomer_button = '[data-test=header-li-newcustomer]'
const lastName_textbox = '#newLastName'
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
	cy.get(lastName_textbox).focus().type('{esc}')
	
	//Logout from application
	cy.wait(3000)
    cy.logout()
  })
  
  
  it('Customer Last Name Search ', function() {
	//Enter Last Name
	cy.get(lastName_textbox).clear().type('Schwartz').should('have.value', 'Schwartz')
	cy.wait(5000)
	
	//Assert Last Name
	//cy.get('span span[ng-if="result.CustomerLastName != \'\'"]').contains('Schwartz')
	cy.get(lastName_result).invoke('text').then((text) => {
    expect('Schwartz').equal(text.trim())
	})
  })
 
  
 