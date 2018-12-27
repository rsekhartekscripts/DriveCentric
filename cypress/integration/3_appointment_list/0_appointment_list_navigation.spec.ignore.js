const allAppointmentUrl = '#/list/All/LibraryTopTabAllAppointmentsToday/0/'
const salesAppointmentUrl = '#/list/Sales/LibraryTopTabSalesAppointmentsToday/0/'
const deliveryAppointmentUrl = '#/list/Delivery/LibraryTopTabDeliveryAppointmentsToday/0/'
const serviceAppointmentUrl = '#/list/Service/LibraryTopTabServiceAppointmentsToday/0/'
const generalAppointmentUrl = '#/list/General/LibraryTopTabGenericAppointmentsToday/0/'

const allTab = '[data-test=list-header-LibraryTopTabAllAppointmentsToday]'
const salesTab = '[data-test=list-header-LibraryTopTabSalesAppointmentsToday]'
const deliveryTab = '[data-test=list-header-LibraryTopTabDeliveryAppointmentsToday]'
const serviceTab = '[data-test=list-header-LibraryTopTabServiceAppointmentsToday]'
const generalTab = '[data-test=list-header-LibraryTopTabGenericAppointmentsToday]'
const listAppointment = '[data-test=list-StoreName]'
const appointmentsButton = '[data-test=header-li-appointments]'
const appointmentDialogueBox = '[data-test=dialog-appointment-div-content]'
const filterDateLabel = '[data-test=filterbar-span-date-label]'
const filterDate = '[data-test=filterbar-span-date]'

const selectedTabClass = 'unselectable selected'

const todayDate = Cypress.moment().format('MMM DD, YYYY')

function isTabSelected(tab) {
  cy.get(tab).should('have.class', selectedTabClass)
}

function verifyRedirect(urlHash) {
  cy.hash().should('eq', urlHash)
}

context('Appointment List Navigation', () => {

  let appointmentId

  before(() => {
    cy.loginUI('power')
    cy.createAppointment('todaySales', 'appt1', 'testing1', 'allPerms')
      .then(resp => appointmentId = resp.body.id)
  })

  describe('AllPerms User', () => {

    describe('Navigation to the Appointment List', () => {

      it('Test 1 - Navigate to Appointment List', () => {
        cy.loginUI('allPerms')
        cy.visit('#/salesHome')
        cy.get(appointmentsButton).click()
        verifyRedirect(allAppointmentUrl)
      })
    })

    describe('Navigation within the Appointment List', () => {

      beforeEach(() => {
        cy.loginUI('allPerms')
        cy.visit(allAppointmentUrl)
      })

      it('Test 2 - Verify Default State', () => {
        cy.get(filterDateLabel)
          .contains('Today')
          .should('be.visible')
        cy.get(filterDate)
          .contains(todayDate)
        isTabSelected(allTab)
      })

      it('Test 3 - Navigate to Sales Tab', () => {
        cy.get(salesTab).click()
        verifyRedirect(salesAppointmentUrl)
        isTabSelected(salesTab)
      })

      it('Test 4 - Navigate to Delivery Tab', () => {
        cy.get(deliveryTab).click()
        verifyRedirect(deliveryAppointmentUrl)
        isTabSelected(deliveryTab)
      })

      it('Test 5 - Navigate to Service Tab', () => {
        cy.get(serviceTab).click()
        verifyRedirect(serviceAppointmentUrl)
        isTabSelected(serviceTab)
      })

      it('Test 6 - Navigate to General Tab', () => {
        cy.get(generalTab).click()
        verifyRedirect(generalAppointmentUrl)
        isTabSelected(generalTab)
      })

      it('Test 7 - Navigate to All Tab', () => {
        cy.get(allTab).click()
        verifyRedirect(allAppointmentUrl)
        isTabSelected(allTab)
      })

      it('Test 8 - Open Edit Appointment From List', () => {
        verifyRedirect(allAppointmentUrl)
        cy.get(listAppointment).click()
        cy.get(appointmentDialogueBox).should('be.visible')
      })
    })
  })

  after(() => {
    cy.deleteAppointment(appointmentId, 'testing1')
  })
})
