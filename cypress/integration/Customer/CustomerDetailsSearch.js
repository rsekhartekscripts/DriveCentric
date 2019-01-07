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
  
  it('Customer First Name Search ', function() {
	//Enter First Name
	cy.get(searchLocators.firstName_textbox).clear().type(searchData.firstname).should('have.value', searchData.firstname)
	cy.wait(10000)
	
	//cy.get('span span[ng-if="result.CustomerFirstName != \'\'"]').contains('Roger')
	//Assert for First, Last Name, Phone Number and Email Verification
	cy.get(searchLocators.firstName_result).invoke('text').then((text) => {
    expect(searchData.firstname).equal(text.trim())
	})
  })
  
  it('Customer Last Name Search ', function() {
	//Enter Last Name
	cy.get(searchLocators.lastName_textbox).clear().type(searchData.lastname).should('have.value', searchData.lastname)
	cy.wait(10000)
	
	//cy.get('span span[ng-if="result.CustomerFirstName != \'\'"]').contains('Roger')
	//Assert for First, Last Name, Phone Number and Email Verification
	cy.get(searchLocators.lastName_result).invoke('text').then((text) => {
    expect(searchData.lastname).equal(text.trim())
	})

  })
  
  it('Customer Phone Number Search ', function() {
	//Enter Phone
	cy.get(searchLocators.phone_textbox).clear().type(searchData.phone).should('have.value', searchData.phone)
    cy.wait(10000)
	//cy.get('span span[ng-if="result.CustomerFirstName != \'\'"]').contains('Roger')
	//Assert for First, Last Name, Phone Number and Email Verification
	cy.get(searchLocators.phone_result).invoke('text').then((text) => {
    expect(searchData.phone).equal(text.trim())
	})
	
  })
  
   it('Customer First & Last Name Search ', function() {
	//Enter Company Name
	cy.get(searchLocators.company_textbox).clear().type(searchData.company).should('have.value', searchData.company)
	cy.wait(10000)
	
	//cy.get('span span[ng-if="result.CustomerFirstName != \'\'"]').contains('Roger')
	//Assert for Company Verification
	cy.get(searchLocators.company_result).invoke('text').then((text) => {
    expect(searchData.company).equal(text.trim())
	})
  })