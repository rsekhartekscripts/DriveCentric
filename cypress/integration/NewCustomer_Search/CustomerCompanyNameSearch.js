const email = Cypress.config('email');
const password = Cypress.config('password');

const addNewCustomerButton = '[data-test=header-li-newcustomer]'
const company_textbox = '[placeholder=Company]'
const company_result = '[ng-if*="result.CustomerCompanyName"]'
	
 before(function () {
	//Login to the application
    cy.login(email, password)
	
	//Click on the add new customer button
	cy.get(addNewCustomer_button).should('be.visible').click()
	cy.wait(4000)
  })
    
  after(function () {
	//Close the New Customer Window With Escape button
	cy.get(company_textbox).focus().type('{esc}')
	
	//Logout from application
	cy.wait(3000)
    cy.logout()
  })
  
  

  it('Customer First Name Search ', function() {
	//Enter Company Name
	cy.get(company_textbox).clear().type('VOLKSWAGEN').should('have.value', 'VOLKSWAGEN')
	cy.wait(5000)
	
	//Assert Company Name
	//cy.get('span span[ng-if="result.CustomerFirstName != \'\'"]').should('have.text', 'Roger')
	cy.get(company_result).invoke('text').then((text) => {
    expect('VOLKSWAGEN').equal(text.trim())
})
  })
  
  
 