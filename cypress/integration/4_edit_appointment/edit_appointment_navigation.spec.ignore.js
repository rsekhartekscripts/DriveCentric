const salesAppointment = 'todaySales'
const appointmentCustomer = 'appt1'
const powerUser = 'power'
const allPermsUser = 'allPerms'
const testing1Store = 'testing1'

const appointmentListRow = '[data-test=list-row]'
const appointmentDatepicker = '[data-test=dialog-appointment-datepicker-component]'
const assignedToButton = '[data-test=dialog-appointment-span-salesName]'
const assignedToCloseButton = '[data-test=dialog-appointment-salesperson-close]'
const cancelButton = '[data-test=dialog-appointment-button-cancel]'
const closeButton = '[data-test=dialog-appointment-div-close]'
const customerCardContainer = '[data-test=customerCard-parent-div]'
const customerName = '[data-test=dialog-appointment-span-customerName]'
const editAppointmentContainer = '[data-test=dialog-appointment-div-content]'
const vehicleInfo = '[data-test=dialog-appointment-span-openVehicleInfo]'

const appointmentListUrl = '#/list/All/LibraryTopTabAllAppointmentsToday/0/'

let appointmentId

function navigateToEditAppointmentScreen(user) {
  cy.login(user)
  cy.visit(appointmentListUrl)
  cy.get(appointmentListRow).click()
}

context('Edit Appointment Navigation', () => {

  describe('AllPerms User', () => {
    before(() => {
      cy.login(powerUser)
      cy.createAppointment(salesAppointment, appointmentCustomer, testing1Store, allPermsUser)
        .then(resp => appointmentId = resp.body.id)
    })

    beforeEach(() => {
      navigateToEditAppointmentScreen(allPermsUser)
    })

    it('Test 01 - Navigate to edit appointment from appointment list', () => {
      cy.get(editAppointmentContainer).should('be.visible')
    })

    //TODO: This will be completed when activity timeline elements gain data attributes.
    // it('Test 02 - Navigate to edit appointment from customer card', () => {
    //
    // })

    it('Test 03 - Open and close assign to dialog', () => {
      cy.get(assignedToButton).click()
      cy.get(assignedToCloseButton).click()
    })

    it('Test 04 - Open and close date dialog', () => {
      cy.get(appointmentDatepicker).click()
      cy.get(closeButton).click()
    })

    it('Test 05 - Open customer card through customer name', () => {
      cy.get(customerName).click()
      cy.get(customerCardContainer).should('be.visible')
    })

    it('Test 06 - Open customer card through associated deal', () => {
      cy.get(vehicleInfo).click()
      cy.get(customerCardContainer).should('be.visible')
    })

    it('Test 07 - Cancel button closes edit appointment', () => {
      cy.get(cancelButton).click()
      cy.get(editAppointmentContainer).should('not.be.visible')
    })

    it('Test 08 - Close button closes edit appointment', () => {
      cy.get(closeButton).click()
      cy.get(editAppointmentContainer).should('not.be.visible')
    })

    after(() => {
      cy.deleteAppointment(appointmentId, testing1Store)
    })
  })
})
