const email = Cypress.config('email');
const password = Cypress.config('password');

const globalSearch_textbox = 'input[placeholder="Search customers"]'
const displayed_result = 'span[class="name"] > span[class="highlightsearch"]'

	
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
	cy.get(displayed_result).invoke('text').then((text) => {
    expect(text.trim()).contains('Roger')
	})
  
})

it('Customer Last Name Search ', function() {
	//Enter Customer Last Name
	cy.get(globalSearch_textbox).clear().type('Schwartz').should('have.value', 'Schwartz')
	cy.wait(10000)
	
	//Verify the displayed results
	cy.get(displayed_result).invoke('text').then((text) => {
    expect(text.trim()).contains('Schwartz')
	})
  
})
  
it('Customer First and Last Name Search ', function() {
	//Enter Customer Fisrt and Last Name
	cy.get(globalSearch_textbox).clear().type('Roger Schwartz').should('have.value', 'Roger Schwartz')
	cy.wait(10000)
	
	//Verify the displayed results
	cy.get(displayed_result).invoke('text').then((text) => {
    expect(text.trim()).contains('Roger Schwartz')
	})
  
})

it('Customer First and Last Name Search ', function() {
	//Enter Customer Fisrt and Last Name
	cy.get(globalSearch_textbox).clear().type('Roger Schwartz').should('have.value', 'Roger Schwartz')
	cy.wait(10000)
	
	//Verify the displayed results
	cy.get(displayed_result).invoke('text').then((text) => {
    expect(text.trim()).contains('Roger')
	})
	cy.get(displayed_result).invoke('text').then((text) => {
    expect(text.trim()).contains('Schwartz')
	})
  
}) 