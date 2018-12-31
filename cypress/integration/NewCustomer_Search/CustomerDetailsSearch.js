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
	cy.get('#newFirstName').clear().type('Roger').should('have.value', 'Roger')
	cy.wait(5000)
	//cy.get('span span[ng-if="result.CustomerFirstName != \'\'"]').contains('Roger')
	cy.get('[ng-if*="result.CustomerFirstName"]').invoke('text').then((text) => {
    expect('Roger').equal(text.trim())
})
  })
  
  it('Customer Last Name Search ', function() {
	cy.get('#newLastName').clear().type('Schwartz').should('have.value', 'Schwartz')
	cy.wait(5000)
	//cy.get('span span[ng-if="result.CustomerLastName != \'\'"]').contains('Schwartz')
	cy.get('[ng-if*="result.CustomerLastName"]').invoke('text').then((text) => {
    expect('Schwartz').equal(text.trim())
})
  })
  
  it('Customer Phone Number Search ', function() {
	cy.get('#newPhone').clear().type('(314) 600-0681').should('have.value', '(314) 600-0681')
	cy.wait(10000)
	//cy.get('[ng-class*="result.CellPhone"]').contains('(314) 600-0681')
	cy.get('[ng-class*="result.CellPhone"]').invoke('text').then((text) => {
    expect('(314) 600-0681').equal(text.trim())
})
  })
  
  it('Customer Email Search ', function() {
	cy.get('[placeholder=Email]').clear().type('illonetruly@gmail.com').should('have.value', 'illonetruly@gmail.com')
	cy.wait(10000)
	//cy.get('[ng-if*="result.Email"]').contains('illonetruly@gmail.com')
	cy.get('[ng-if*="result.Email"]').invoke('text').then((text) => {
    expect('illonetruly@gmail.com').equal(text.trim())
})
  })