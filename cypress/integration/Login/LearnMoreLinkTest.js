import * as loginLocators from './../../HTMLElementSelectors/LoginLogout.json';


describe('Learn More Link Verification', function () {
  beforeEach(function () {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'open').as('windowOpen')
      }
    })
})

  it('Learn More Link Test', function() {	 
	//Click on Learn More link
	cy.get(loginLocators.learnMore_link).should('be.visible').click()
	
	// Verify Learn More page logo
	cy.get('@windowOpen').should('include', 'drivecentric.com')
	cy.get('@windowOpen').contains(loginLocators.learnMorePage_logo_link).should('be.visible')
  })
})

//https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window/cypress/integration/window-stubbing.spec.js