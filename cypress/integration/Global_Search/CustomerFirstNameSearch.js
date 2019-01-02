const email = Cypress.config('email');
const password = Cypress.config('password');

const globalSearch_textbox = 'input[placeholder="Search customers"]'
const firstName_result = 'span[class="name"]>span[class*="result"]'
const lastName_result = '[ng-if*="result.CustomerLastName"]'
const phone_result = '[ng-class*="result.CellPhone"]'
const email_result = '[ng-if*="result.Email"]'
	
 before(function () {
	//Login To the DriveCentric
    cy.login(email, password)
  })
    
  after(function () {
	//Logout From DriveCentric
	cy.wait(3000)
    cy.logout()
  })
  
  it('Customer First Name Search ', function() {
	//Enter Customer First Name
	cy.get(globalSearch_textbox).clear().type('Roger').should('have.value', 'Roger')
	cy.wait(10000)
	
	//Verify the displayed results
	cy.get(firstName_result).should('have.attr', 'ng-bind-html', 'result').invoke('text').then((text) => {
    expect('Roger').contains(text.trim())
	})
  
})
  
 