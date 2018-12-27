const salesHomeUrl = '#/salesHome'
const deskingUrl = '#/desking/overview'
const leadsUrl = '#/list/Lead/PipeLeads/0/LibraryLEAV'
const conversationsUrl = '#/conversations'
const myWorkplanUrl = '#/workplan/me'
const enterpriseWorkplanUrl = '#/workplan/'
const appointmentsUrl = '#/list/All/LibraryTopTabAllAppointmentsToday/0/'
const inventoryUrl = '#/inventory'
const miningUrl = '#/driveMining'
const blastUrl = '#/emailBlaster/list/'
const reportsUrl = '#/reportManager/My%20Reports'
const dashboardUrl = '#/deskLog'
const reputationUrl = '#/reputationManagement/overview'
const callReviewUrl = '#/list/Unreviewed%20Calls/CallQueueUnreviewed/0/'

const homeButton = '[data-test=header-li-home]'
const deskingButton = '[data-test=header-li-desking]'
const leadsButton = '[data-test=header-li-leads]'
const conversationsButton = '[data-test=header-li-conversations]'
const workplanButton = '[data-test=header-li-workplan]'
const myWorkplanButton = '[data-test=workplan-li-individual]'
const enterpriseWorkplanButton = '[data-test=workplan-li-enterprise]'
const appointmentsButton = '[data-test=header-li-appointments]'
const inventoryButton = '[data-test=header-li-inventory]'
const miningButton = '[data-test=header-li-mining]'
const blastButton = '[data-test=header-li-blast]'
const reportsButton = '[data-test=header-li-reports]'
const viewAllReportsButton = '[data-test=report-li-viewall]'
const dashboardButton = '[data-test=header-li-dashboard]'
const userMenuButton = '[data-test=profile-button-avatar]'
const userMenu = '[data-test=profile-dropdown-listbox]'
const reputationButton = '[data-test=header-li-reputation]'
const addNewCustomerButton = '[data-test=header-li-newcustomer]'
const recentCustomerButton = '[data-test=header-li-recentcustomers]'
const callReviewButton = '[data-test=header-li-callreview]'

function verifyRedirect(urlHash) {
  cy.hash().should('eq', urlHash)
}

function navigateToAppointmentsPage() {
  cy.visit(appointmentsUrl)
}

context('Topbar Navigation', () => {

  describe('AllPerms User', () => {

    beforeEach(() => {
      cy.login('allPerms')
      cy.visit(salesHomeUrl)
    })

    it('Test 1 - Navigate to Pipeline Homepage', () => {
      navigateToAppointmentsPage()
      cy.get(homeButton).click()
      verifyRedirect(salesHomeUrl)
    })

    it('Test 2 - Navigate to Desking', () => {
      cy.get(deskingButton).click()
      verifyRedirect(deskingUrl)
    })

    it('Test 3 - Navigate to Leads', () => {
      cy.get(leadsButton).click()
      verifyRedirect(leadsUrl)
    })

    it('Test 4 - Navigate to Conversations', () => {
      cy.get(conversationsButton).click()
      verifyRedirect(conversationsUrl)
    })

    it('Test 5 - Navigate to My Workplan', () => {
      cy.get(workplanButton).click()
      cy.get(myWorkplanButton).click()
      verifyRedirect(myWorkplanUrl)
    })

    it('Test 6 - Navigate to Enterprise Workplan', () => {
      cy.get(workplanButton).click()
      cy.get(enterpriseWorkplanButton).click()
      verifyRedirect(enterpriseWorkplanUrl)
    })

    it('Test 7 - Navigate to Appointments', () => {
      cy.get(appointmentsButton).click()
      verifyRedirect(appointmentsUrl)
    })

    it('Test 8 - Navigate to Inventory', () => {
      cy.get(inventoryButton).click()
      verifyRedirect(inventoryUrl)
    })

    it('Test 9 - Navigate to Mining', () => {
      cy.get(miningButton).click()
      verifyRedirect(miningUrl)
    })

    it('Test 10 - Navigate to Email Blast', () => {
      cy.get(blastButton).click()
      verifyRedirect(blastUrl)
    })

    it('Test 11 - Navigate to Reports', () => {
      cy.get(reportsButton).click()
      cy.get(viewAllReportsButton).click()
      verifyRedirect(reportsUrl)
    })

    it('Test 12 - Navigate to Call Review', () => {
      cy.get(callReviewButton).click()
      verifyRedirect(callReviewUrl)
    })

    it('Test 13 - Navigate to Reputation Management', () => {
      cy.get(reputationButton).click()
      verifyRedirect(reputationUrl)
    })

    it('Test 14 - Navigate to Dashboard', () => {
      cy.get(dashboardButton).click()
      verifyRedirect(dashboardUrl)
    })

    it('Test 15 - Navigate to Add New Customer', () => {
      cy.get(addNewCustomerButton).click()
      //Todo: verify that the New Customer screen is showing -> FEAT-11
    })

    it('Test 16 - Navigate to Recent Customers', () => {
       cy.get(recentCustomerButton).click()
       //Todo: verify that the Recent Customers menu is showing -> FEAT-11
    })

    it('Test 17 - Navigate to User Menu', () => {
      cy.get(userMenuButton).click()
      cy.get(userMenu).should('be.visible')
    })
  })

  describe('NoData User', () => {

    beforeEach(() => {
      cy.login('noData')
      cy.visit(salesHomeUrl)
    })

    it('Test 18 - Navigate to My Workplan', () => {
      cy.get(workplanButton).click()
      verifyRedirect(myWorkplanUrl)
    })
  })
})
