const allPermsUser = 'allPerms'
const genericUser = 'generic'
const testing1Store = 'testing1'

const loginUrl = '/Login.aspx'
const salesHomeUrl = '#/salesHome'

const userMenuButton = '[data-test=profile-button-avatar]'
const logoutButton = '[data-test=profile-link-logout]'
const clockInOutButton = '[data-test=profile-menu-clockOutIn]'

const clockedInClass = 'singleline clockedin'

function clickUserMenuButton() {
  cy.get(userMenuButton).click()
}

function clickClockInOutButton() {
  cy.get(clockInOutButton).click()
}

context('User Menu Actions', () => {

  before(() => {
    cy.login('power')
    cy.clockInUser(testing1Store, genericUser)
  })

  describe('Generic User', () => {

    beforeEach(() => {
      cy.login(genericUser)
      cy.visit(salesHomeUrl)
      clickUserMenuButton()
    })

    it('Test 018 - Log Out', () => {
      cy.get(logoutButton).click()
      cy.location().then(loc => expect(loc.pathname).to.eq(loginUrl))
      cy.getCookie(Cypress.env('authCookie')).should('not.exist')
    })

    it('Test 019 - Clock Out User', () => {
      cy.wait(3000)
      clickClockInOutButton()
      cy.get(clockInOutButton)
        .should('not.have.class', clockedInClass)
    })
  })

  describe('AllPerms User', () => {

    it('Test 020 - Clock In User', () => {
      cy.login(allPermsUser)
      cy.visit(salesHomeUrl)
      clickUserMenuButton()
      cy.wait(3000)
      clickClockInOutButton()
      cy.get(clockInOutButton)
        .should('have.class', clockedInClass)
    })
  })

  after(() => {
    cy.clockOutUser(testing1Store, allPermsUser)
  })
})
