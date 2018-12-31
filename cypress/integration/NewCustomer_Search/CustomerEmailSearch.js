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
  
  it('Customer Email Search ', function() {
	cy.get('[placeholder=Email]').clear().type('illonetruly@gmail.com').should('have.value', 'illonetruly@gmail.com')
	cy.wait(10000)
	//cy.get('[ng-if*="result.Email"]').contains('illonetruly@gmail.com')
	cy.get('[ng-if*="result.Email"]').invoke('text').then((text) => {
    expect('illonetruly@gmail.com').equal(text.trim())
})
  })
  
 