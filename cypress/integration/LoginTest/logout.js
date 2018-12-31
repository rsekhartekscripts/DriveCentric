describe('Drive Cetric Logout', function() {
  it('Successfull Logout', function() {
	 //Click on EO Menu
	cy.contains('EO').should('be.visible').click()
	
	//Click on Logout Link
	cy.contains('Logout').should('be.visible').click()
	cy.wait(10000)
	
	//Verify Login page
	//cy.url().should('contains','Logout.aspx')
	cy.contains('Login').should('be.visible')
  })
})