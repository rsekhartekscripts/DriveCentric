const salesAppointment = 'todaySales'
const deliveryAppointment = 'todayDelivery'
const serviceAppointment = 'todayService'
const generalAppointment = 'todayGeneral'
const appointmentCustomer = 'appt1'
const powerUser = 'power'
const genericUser = 'generic'
const allPermsUser = 'allPerms'
const testing1Store = 'testing1'

const appointmentListItem = '[data-test=list-row]'
const appointmentTypeItem = '[data-test=dialog-appointment-select-department]'
const appointmentType = '[data-test=dialog-appointment-select-department]'
const appointmentDatepicker = '[data-test=dialog-appointment-datepicker-component]'
const appointmentTimeInput = '[data-test=dialog-appointment-input-time]'
const appointmentNoteTextArea = '[data-test=dialog-appointment-textarea-notes]'
const customerName = '[data-test=dialog-appointment-span-customerName]'
const salespersonName = '[data-test=dialog-appointment-span-salesName]'
const vehicleInfo = '[data-test=dialog-appointment-span-openVehicleInfo]'

const appointmentListUrl = '#/list/All/LibraryTopTabAllAppointmentsToday/0/'

let appointmentDate
let appointmentId
let appointmentTime

function navigateToEditAppointmentScreen(user) {
  cy.login(user)
  cy.visit(appointmentListUrl)
  cy.get(appointmentListItem).click()
}

context('Edit Appointment Data Validation', () => {

  describe('AllPerms User', () => {

    describe('Appointment attributes', () => {
      before(() => {
        cy.login(powerUser)
        cy.createAppointment(salesAppointment, appointmentCustomer, testing1Store, allPermsUser)
          .then(resp => appointmentId = resp.body.id)
        appointmentDate = Cypress.moment().format('MMM D, YYYY')
        appointmentTime = Cypress.moment().format('h:mm A')
      })

      beforeEach(() => {
        navigateToEditAppointmentScreen(allPermsUser)
      })

      it('Test 09 - Verify Customer Name', () => {
        cy.getStaticCustomers().then(customers =>
          cy.get(customerName).contains(customers[appointmentCustomer].name))
      })

      it('Test 10 - Verify Assigned To Salesperson Name', () => {
        cy.getUsers().then(users =>
          cy.get(salespersonName).contains(users[allPermsUser].name))
      })

      it('Test 013 - Verify Appointment Date', () => {
        cy.get(appointmentDatepicker).contains(appointmentDate)
      })

      //TODO: Work out how to read value from ng-model class
      // it('Test 014 - Verify Appointment Time', () => {
      //   cy.get(appointmentTimeInput).contains(appointmentTime)
      // })

      //TODO: Work out how to read value from ng-model class
      // it('Test 015 - Verify Appointment Note', () => {
      //   cy.getAppointments().then(appointments =>
      //     cy.get(appointmentNoteTextArea).contains(appointments[salesAppointment].notes))
      // })

      after(() => {
        cy.deleteAppointment(appointmentId, testing1Store)
      })
    })

    describe('Sales appointments', () => {
      before(() => {
        cy.login(powerUser)
        cy.createAppointment(salesAppointment, appointmentCustomer, testing1Store, allPermsUser)
          .then(resp => appointmentId = resp.body.id)
      })

      it('Test 16 - Verify Appointment Type is Sales', () => {
        navigateToEditAppointmentScreen(allPermsUser)
        cy.getAppointments().then(appointments =>
          cy.get(appointmentTypeItem).contains(appointments[salesAppointment].type))
      })

      after(() => {
        cy.deleteAppointment(appointmentId, testing1Store)
      })
    })

    describe('Delivery appointments', () => {
      before(() => {
        cy.login(powerUser)
        cy.createAppointment(deliveryAppointment, appointmentCustomer, testing1Store, allPermsUser)
          .then(resp => appointmentId = resp.body.id)
      })

      it('Test 17 - Verify Appointment Type is Delivery', () => {
        navigateToEditAppointmentScreen(allPermsUser)
        cy.getAppointments().then(appointments =>
          cy.get(appointmentTypeItem).contains(appointments[deliveryAppointment].type))
      })

      after(() => {
        cy.deleteAppointment(appointmentId, testing1Store)
      })
    })

    describe('Service appointments', () => {
      before(() => {
        cy.login(powerUser)
        cy.createAppointment(serviceAppointment, appointmentCustomer, testing1Store, allPermsUser)
          .then(resp => appointmentId = resp.body.id)
      })

      it('Test 18 - Verify Appointment Type is Service', () => {
        navigateToEditAppointmentScreen(allPermsUser)
        cy.getAppointments().then(appointments =>
          cy.get(appointmentTypeItem).contains(appointments[serviceAppointment].type))
      })

      after(() => {
        cy.deleteAppointment(appointmentId, testing1Store)
      })
    })

    describe('General appointments', () => {
      before(() => {
        cy.login(powerUser)
        cy.createAppointment(generalAppointment, appointmentCustomer, testing1Store, allPermsUser)
          .then(resp => appointmentId = resp.body.id)
      })
    
      it('Test 19 - Verify Appointment Type is General', () => {
        navigateToEditAppointmentScreen(allPermsUser)
        cy.getAppointments().then(appointments =>
          cy.get(appointmentTypeItem).contains(appointments[generalAppointment].type))
      })

      after(() => {
        cy.deleteAppointment(appointmentId, testing1Store)
      })
    })
  })
})
