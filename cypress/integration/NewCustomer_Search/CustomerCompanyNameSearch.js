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
  

  it('Customer First Name Search ', function() {
	cy.get('[placeholder=Company]').clear().type('VOLKSWAGEN').should('have.value', 'VOLKSWAGEN')
	cy.wait(5000)
	//cy.get('span span[ng-if="result.CustomerFirstName != \'\'"]').should('have.text', 'Roger')
	cy.get('[ng-if*="result.CustomerCompanyName"]').invoke('text').then((text) => {
    expect('VOLKSWAGEN').equal(text.trim())
})
  })
  
  
 