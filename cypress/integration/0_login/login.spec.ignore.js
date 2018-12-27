import HTMLELementSelectors from './../../HTMLELementSelectors';

function verifyErrorMessage() {
  cy.get(HTMLELementSelectors.login.texts.errorMessage)
    .contains('The email/password combination is not correct.')
    .should('be.visible')
}

function verifyRedirectToHomepage() {
  cy.hash().should('eq', HTMLELementSelectors.urlPaths.salesHome)
}

function verifyUserSession() {
  cy.getCookie(Cypress.env('authCookie')).should('exist')
}

context('Login', () => {

  beforeEach(() => {
    cy.visit(HTMLELementSelectors.urlPaths.login)
  })

  describe('Navigation', () => {

    it('Test 1 - Login Page Learn More link', () => {
      cy.get(HTMLELementSelectors.login.buttons.learnMore)
        .should('be.visible')
    })

    it('Test 2 - Login Page Privacy Policy link', () => {
      cy.get(HTMLELementSelectors.login.links.privacyPolicy)
        .should('have.attr', 'href')
        .and('eq', 'http://www.drivecentric.com/privacy/')
        .get(HTMLELementSelectors.login.links.privacyPolicy)
        .should('have.attr', 'target')
        .and('eq', '_blank')
      })
    })

  describe('Form Validation', () => {

    it('Test 3 - Form validation empty fields', () => {
      cy.clickLoginButton()
      verifyErrorMessage()
    })

    it('Test 4 - Form validation empty password', () => {
      cy.getUsers().then(users => {
        cy.inputUsername(users.generic)
      })
      cy.clickLoginButton()
      verifyErrorMessage()
    })

    it('Test 5 - Form validation empty email', () => {
      cy.getUsers().then(users => {
        cy.inputPassword(users.generic)
      })
      cy.clickLoginButton()
      verifyErrorMessage()
    })
  })

  describe('Invalid Login', () => {

    it('Test 6 - Invalid Username', () => {
        cy.loginUser('invalidUsername')
        verifyErrorMessage()
    })

    it('Test 7 - Invalid Password', () => {
        cy.loginUser('invalidPassword')
        verifyErrorMessage()
    })

    it('Test 8 - Inactive User', () => {
        cy.loginUser('inactive')
        verifyErrorMessage()
    })
  })

  describe('Successful Login', () => {

    it ('Test 9 - Generic User', () => {
        cy.loginUser('generic')
        verifyRedirectToHomepage()
        verifyUserSession()
    })

    it ('Test 10 - Enterprise User', () => {
        cy.loginUser('enterprise')
        verifyRedirectToHomepage()
        verifyUserSession()
    })

    it ('Test 11 - Power User', () => {
        cy.loginUser('power')
        verifyRedirectToHomepage()
        verifyUserSession()
    })

    it ('Test 12 - Impersonate User', () => {
        cy.loginUser('impersonate')
        verifyRedirectToHomepage()
        verifyUserSession()
    })
  })
})
