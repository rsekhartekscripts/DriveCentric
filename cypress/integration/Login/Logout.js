import * as loginLocators from './../../HTMLElementSelectors/LoginLogout.json';

describe('Drive Cetric Logout', function() {
  it('Successfull Logout', function() {
	 //Click on EO Menu
	cy.contains(loginLocators.eo_menu).should('be.visible').click()
	
	//Click on Logout Link
	cy.contains(loginLocators.logout_button).should('be.visible').click()
	
	//Verify Login page
	//cy.url().should('contains','Logout.aspx')
	cy.contains(loginLocators.login_button).should('be.visible')
  })
})