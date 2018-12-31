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
  
  it('Customer First & Last Name Search ', function() {
	 //Enter First Name
	cy.get('#newFirstName').clear().type('Roger').should('have.value', 'Roger')
	
	//Enter Last Name
	cy.get('#newLastName').clear().type('Schwartz').should('have.value', 'Schwartz')
	
	//cy.get('span span[ng-if="result.CustomerFirstName != \'\'"]').contains('Roger')
	//Assert for First and Last Name Verification
	cy.get('[ng-if*="result.CustomerFirstName"]').invoke('text').then((text) => {
    expect('Roger').equal(text.trim())
	})
	cy.get('[ng-if*="result.CustomerLastName"]').invoke('text').then((text) => {
    expect('Schwartz').equal(text.trim())
	})
  })
  
 