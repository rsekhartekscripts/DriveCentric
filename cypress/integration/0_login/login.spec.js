import * as AppUrlPaths from './../../HTMLElementSelectors/AppUrlPaths.json';

import * as LoginLogout from './../../HTMLElementSelectors/LoginLogout.json';

function verifyErrorMessage() {
  cy.get(LoginLogout.error_message_text)
    .contains('The email/password combination is not correct.')
    .should('be.visible')
}

function verifyRedirectToHomepage() {
  cy.hash().should('eq', AppUrlPaths.sales_home)
}

function verifyUserSession() {
  cy.getCookie(Cypress.env('authCookie')).should('exist')
}

context('Login', () => {

  beforeEach(() => {
    cy.visit(AppUrlPaths.login)
  })

  describe('Navigation', () => {

    it('Test 1 - Login Page Learn More link', () => {
      cy.get(LoginLogout.learnMore_link)
        .should('be.visible')
    })

    it('Test 2 - Login Page Privacy Policy link', () => {
      cy.get(LoginLogout.privacy_policy_link)
        .should('have.attr', 'href')
        .and('eq', 'http://www.drivecentric.com/privacy/')
        .get(LoginLogout.privacy_policy_link)
        .should('have.attr', 'target')
        .and('eq', '_blank')
      })
    })

  describe('Form Validation', () => {

    it('Test 3 - Form validation empty fields', () => {
      cy.clickLoginButton()
      verifyErrorMessage()
    })

    it('Test 4 - Form validation empty username', () => {
      cy.getUsers().then(users => {
        cy.inputUsername(users.invalidUsername)
      })
      cy.clickLoginButton()
      verifyErrorMessage()
    })

    it('Test 5 - Form validation empty password', () => {
      cy.getUsers().then(users => {
        cy.inputPassword(users.invalidUsername)
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
        cy.loginUser('invalidUsername')
        verifyErrorMessage()
    })

  })

  describe('Successful Login', () => {

    it ('Test 8 - Enterprise User', () => {
        cy.loginUser('enterprise')
        verifyRedirectToHomepage()
        verifyUserSession()
        cy.logoutUI()
    })

  })
})
