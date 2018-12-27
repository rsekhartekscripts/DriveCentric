const salesHomeUrl = '#/salesHome'

const userMenu = '[data-test=profile-dropdown-listbox]'
const userMenuButton = '[data-test=profile-button-avatar]'
const profileUsernameText = '[data-test=profile-text-customername]'
const profileDealershipText = '[data-test=profile-text-sessionstore]'

context('User Menu Data Validation', () => {

  before(() => {
    cy.getUsers().as('users')
  })

  describe('AllPerms User', () => {

    beforeEach(() => {
      cy.login('allPerms')
      cy.visit(salesHomeUrl)
      cy.get(userMenuButton).click()
    })

    it('Test 1 - Verify logged in user name', function() {
      cy.get(profileUsernameText)
        .should('be.visible')
        .should('have.text', this.users.allPerms.name)
    })

    it('Test 2 - Verify logged in user store', function() {
      cy.get(profileDealershipText)
        .should('be.visible')
        .should('have.text', this.users.allPerms.dealership)
    })
  })
})
