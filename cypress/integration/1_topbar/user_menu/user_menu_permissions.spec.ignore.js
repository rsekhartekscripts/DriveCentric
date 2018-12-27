const salesHomeUrl = '#/salesHome'

const userMenu = '[data-test=profile-dropdown-listbox]'
const userMenuButton = '[data-test=profile-button-avatar]'
const viewProfileButton = '[data-test=profile-menu-viewProfile]'
const mySettingsButton = '[data-test=profile-menu-mySettings]'
const storeSettingsButton = '[data-test=profile-menu-storeSettings]'
const systemTestButton = '[data-test=profile-menu-systemTest]'
const changeStoreButton = '[data-test=profile-menu-changeStores]'
const clockInOutButton = '[data-test=profile-menu-clockOutIn]'
const changeStoreDialogBox = '[data-test=change-store-dialog-box]'

function clickUserMenuButton() {
  cy.get(userMenuButton).click()
}

context('User Menu Permissions', () => {

  describe('Generic User', () => {

    it('Test 9 - Verify Change Store Not Visible', () => {
      cy.login('generic')
      cy.visit(salesHomeUrl)
      clickUserMenuButton()
      cy.get(changeStoreButton).should('not.be.visible')
    })
  })

  describe('Enterprise User', () => {

    it('Test 10 - Verify Change Store is Visible', () => {
      cy.login('enterprise')
      cy.visit(salesHomeUrl)
      clickUserMenuButton()
      cy.get(changeStoreButton).should('be.visible')
    })
  })

  describe('Power User', () => {

    beforeEach(() => {
      cy.login('power')
      cy.visit(salesHomeUrl)
      clickUserMenuButton()
    })

    it('Test 11 - Verify Change Store is Visible', () => {
      cy.get(changeStoreButton).should('be.visible')
    })

    it('Test 12 - Verify System Test is Visible', () => {
      cy.get(systemTestButton).should('be.visible')
    })
  })

  describe('AllPerms User', () => {

    beforeEach(() => {
      cy.login('allPerms')
      cy.visit(salesHomeUrl)
      clickUserMenuButton()
    })

    it('Test 13 - Verify Store Settings is Visible', () => {
      cy.get(storeSettingsButton).should('be.visible')
    })

    it('Test 14 - Verify Clock In/Out is Visible', () => {
      cy.get(clockInOutButton).should('be.visible')
    })
  })

  describe('NoData User', () => {

    beforeEach(() => {
      cy.login('noData')
      cy.visit(salesHomeUrl)
      clickUserMenuButton()
    })

    it('Test 15 - Verify Clock In/Out Not Visible', () => {
      cy.get(clockInOutButton).should('not.be.visible')
    })

    it('Test 16 - Verify System Test Not Visible', () => {
      cy.get(systemTestButton).should('not.be.visible')
    })

    it('Test 17 - Verify Store Settings Not Visible', () => {
      cy.get(storeSettingsButton).should('not.be.visible')
    })
  })
})
