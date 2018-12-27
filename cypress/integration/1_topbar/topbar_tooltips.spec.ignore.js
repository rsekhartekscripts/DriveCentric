const SalesHomeUrl = '#/salesHome'

const deskingButton = '[data-test=header-li-desking]'
const leadsButton = '[data-test=header-li-leads]'
const conversationsButton = '[data-test=header-li-conversations]'
const workplanButton = '[data-test=header-li-workplan]'
const appointmentsButton = '[data-test=header-li-appointments]'
const inventoryButton = '[data-test=header-li-inventory]'
const miningButton = '[data-test=header-li-mining]'
const blastButton = '[data-test=header-li-blast]'
const reportsButton = '[data-test=header-li-reports]'
const dashboardButton = '[data-test=header-li-dashboard]'
const reputationButton = '[data-test=header-li-reputation]'
const addNewCustomerButton = '[data-test=header-li-newcustomer]'
const recentCustomerButton = '[data-test=header-li-recentcustomers]'
const callReviewButton = '[data-test=header-li-callreview]'

const deskingTooltip = '[data-test=header-tooltip-desking]'
const leadsTooltip = '[data-test=header-tooltip-leads]'
const conversationsTooltip = '[data-test=header-tooltip-conversations]'
const workplanTooltip = '[data-test=header-tooltip-workplan]'
const appointmentsTooltip = '[data-test=header-tooltip-appointments]'
const inventoryTooltip = '[data-test=header-tooltip-inventory]'
const miningTooltip = '[data-test=header-tooltip-mining]'
const blastTooltip = '[data-test=header-tooltip-blast]'
const reportsTooltip = '[data-test=header-tooltip-reports]'
const callReviewTooltip = '[data-test=header-tooltip-callreview]'
const reputationTooltip = '[data-test=header-tooltip-reputation]'
const dashboardTooltip = '[data-test=header-tooltip-dashboard]'
const addNewCustomerTooltip = '[data-test=header-tooltip-newcustomer]'
const recentCustomerTooltip = '[data-test=header-tooltip-recentcustomers]'

context('Topbar Tooltip Data Validation', () => {

  describe('AllPerms User', () => {

    beforeEach(() => {
      cy.login('allPerms')
      cy.visit(SalesHomeUrl)
    })

    it('Test 19 - Verify Desking Tooltip', () => {
      cy.get(deskingButton).trigger('mouseover')
      cy.get(deskingTooltip).should('be.visible')
    })

    it('Test 20 - Verify Leads Tooltip', () => {
      cy.get(leadsButton).trigger('mouseover')
      cy.get(leadsTooltip).should('be.visible')
    })

    it('Test 21 - Verify Conversations Tooltip', () => {
      cy.get(conversationsButton).trigger('mouseover')
      cy.get(conversationsTooltip).should('be.visible')
    })

    it('Test 22 - Verify Workplan Tooltip', () => {
      cy.get(workplanButton).trigger('mouseover')
      cy.get(workplanTooltip).should('be.visible')
    })

    it('Test 23 - Verify Appointments Tooltip', () => {
      cy.get(appointmentsButton).trigger('mouseover')
      cy.get(appointmentsTooltip).should('be.visible')
    })

    it('Test 24 - Verify Inventory Tooltip', () => {
      cy.get(inventoryButton).trigger('mouseover')
      cy.get(inventoryTooltip).should('be.visible')
    })

    it('Test 25 - Verify Mining Tooltip', () => {
      cy.get(miningButton).trigger('mouseover')
      cy.get(miningTooltip).should('be.visible')
    })

    it('Test 26 - Verify Email Blast Tooltip', () => {
      cy.get(blastButton).trigger('mouseover')
      cy.get(blastTooltip).should('be.visible')
    })

    it('Test 27 - Verify Reports Tooltip', () => {
      cy.get(reportsButton).trigger('mouseover')
      cy.get(reportsTooltip).should('be.visible')
    })

    it('Test 28 - Verify Call Review Tooltip', () => {
      cy.get(callReviewButton).trigger('mouseover')
      cy.get(callReviewTooltip).should('be.visible')
    })

    it('Test 29 - Verify Reputation Management Tooltip', () => {
      cy.get(reputationButton).trigger('mouseover')
      cy.get(reputationTooltip).should('be.visible')
    })

    it('Test 30 - Verify Dashboard Tooltip', () => {
      cy.get(dashboardButton).trigger('mouseover')
      cy.get(dashboardTooltip).should('be.visible')
    })

    it('Test 31 - Verify Add New Customer Tooltip', () => {
      cy.get(addNewCustomerButton).trigger('mouseover')
      cy.get(addNewCustomerTooltip).should('be.visible')
    })

    it('Test 32 - Verify Recent Customers Tooltip', () => {
      cy.get(recentCustomerButton).trigger('mouseover')
      cy.get(recentCustomerTooltip).should('be.visible')
    })
  })
})
