
import * as searchLocators from './../../HTMLElementSelectors/NewCustomerSearch.json';
import * as searchData from './../../TestData/NewCustomerSearchData.json';

const email = Cypress.config('email');
const password = Cypress.config('password');

	
 before(function () {
	//Login to the application
    cy.login(email, password)
	
	//Click on the add new customer button
	cy.get(searchLocators.addNewCustomer_button).should('be.visible').click()
	cy.wait(4000)
  })
    
  after(function () {
	//Close the New Customer Window With Escape button
	cy.get(searchLocators.firstName_textbox).focus().type('{esc}')
	
	//Logout from application
	cy.wait(3000)
    cy.logout()
  })
  
  it('Search New customer with Last name ', function() {
	//Enter Last Name
	cy.get(searchLocators.lastName_textbox).clear().type(searchData.lastname).should('have.value', searchData.lastname)
	cy.wait(10000)
	
	//Assert Last Name verification
	cy.get(searchLocators.lastName_result).invoke('text').then((text) => {
    expect(searchData.lastname).equal(text.trim())
	})

  })
  
 