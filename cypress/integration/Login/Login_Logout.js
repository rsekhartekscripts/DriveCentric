const email = Cypress.config('email');
const password = Cypress.config('password');

describe('Successfull login and Logout Verification', function () {
  
 it('Login to Drive Centric', () => {
	cy.login(email, password)
  })
  
  it('Logout from Drive Centric', () => {
	 cy.logout()
  })
  
})