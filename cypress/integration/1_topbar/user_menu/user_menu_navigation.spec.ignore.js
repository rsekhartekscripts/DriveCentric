const salesHomeUrl = '#/salesHome'
const viewProfileUrl = '#/salesProfile/customers'
const mySettingsUrl = '#/settings'
const storeSettingsUrl = '#/storeSettings'
const systemTestUrl = '#/qos'

const userMenu = '[data-test=profile-dropdown-listbox]'
const userMenuButton = '[data-test=profile-button-avatar]'
const viewProfileButton = '[data-test=profile-menu-viewProfile]'
const mySettingsButton = '[data-test=profile-menu-mySettings]'
const storeSettingsButton = '[data-test=profile-menu-storeSettings]'
const systemTestButton = '[data-test=profile-menu-systemTest]'
const changeStoreButton = '[data-test=profile-menu-changeStores]'
const changeStoreDialogBox = '[data-test=change-store-dialog-box]'

function clickUserMenuButton() {
  cy.get(userMenuButton).click()
}

function verifyRedirect(urlHash) {
  cy.hash().should('eq', urlHash)
}

context('User Menu Navigation', () => {

  describe('AllPerms User', () => {

    beforeEach(() => {
      cy.login('allPerms')
      cy.visit(salesHomeUrl)
      clickUserMenuButton()
    })

    it('Test 1 - Navigate to User Menu', () => {
      cy.get(userMenu).should('be.visible')
    })

    it('Test 2 - Navigate to View Profile', () => {
      cy.get(viewProfileButton).click()
      verifyRedirect(viewProfileUrl)
    })

    it('Test 3 - Navigate to My Settings', () => {
      cy.get(mySettingsButton).click()
      verifyRedirect(mySettingsUrl)
    })

    it('Test 4 - Navigate to Store Settings', () => {
      cy.get(storeSettingsButton).click()
      verifyRedirect(storeSettingsUrl)
    })
  })

  describe('Power User', () => {

    it('Test 5 - Navigate to System Test', () => {
      cy.login('power')
      cy.visit(salesHomeUrl)
      clickUserMenuButton()
      cy.get(systemTestButton).click()
      verifyRedirect(systemTestUrl)
    })
  })

  describe('Enterprise User', () => {

    it('Test 6 - Navigate to Change Stores', () => {
      cy.login('enterprise')
      cy.visit(salesHomeUrl)
      clickUserMenuButton()
      cy.get(changeStoreButton).click()
      cy.get(changeStoreDialogBox).should('be.visible')
    })
  })
})
