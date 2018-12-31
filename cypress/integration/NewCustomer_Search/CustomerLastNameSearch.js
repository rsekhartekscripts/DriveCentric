const email = Cypress.config('email');
const password = Cypress.config('password');

	
  before(function () {
	  //Load the custom details search data
	cy.fixture('customer_details.json').as('customerSearch')
    cy.login(email, password)
	//Click on the add customer
	cy.get('[data-test=header-li-newcustomer]').should('be.visible').click()
	cy.wait(4000)
  })
    
  after(function () {
	//cy.get('[class=driveDialogClose]').should('be.visible').click()
	cy.get('#newFirstName').focus().type('{esc}')
	cy.wait(3000)
    cy.logout()
  })
  
  it('Customer Last Name Search ', function() {
	cy.get('#newLastName').clear().type('Schwartz').should('have.value', 'Schwartz')
	cy.wait(5000)
	//cy.get('span span[ng-if="result.CustomerLastName != \'\'"]').contains('Schwartz')
	cy.get('[ng-if*="result.CustomerLastName"]').invoke('text').then((text) => {
    expect('Schwartz').equal(text.trim())
})
  })
 
  
 