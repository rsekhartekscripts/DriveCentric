const powerUser = 'power'
const allPermsUser = 'allPerms'
const testing1Store = 'testing1'
const appt1Customer = 'appt1'
const salesAppointment = 'todaySales'
const deliveryAppointment = 'todayDelivery'
const serviceAppointment = 'todayService'
const generalAppointment = 'todayGeneral'

const dateFormat = 'ddd, MMM D, YYYY'
const timeFormat = 'h:mm A'

const allTabUrl = '#/list/All/LibraryTopTabAllAppointmentsToday/0/'
const salesTabUrl = '#/list/Sales/LibraryTopTabSalesAppointmentsToday/0/'
const deliveryTabUrl = '#/list/Delivery/LibraryTopTabDeliveryAppointmentsToday/0/'
const serviceTabUrl = '#/list/Service/LibraryTopTabServiceAppointmentsToday/0/'
const generalTabUrl = '#/list/General/LibraryTopTabGenericAppointmentsToday/0/'

const listContainer = '[data-test=list-parent-div]'
const appointmentDateItem = '[data-test=list-AppointmentDate]'
const appointmentTimeItem = '[data-test=list-AppointmentTime]'
const appointmentTypeItem = '[data-test=list-AppointmentTypeFriendly]'
const associateItem = '[data-test=list-AppointmentUser]'
const createdByItem = '[data-test=list-AppointmentCreatedByUser]'
const customerNameItem = '[data-test=list-CustomerMiniSquare]'
const isConfirmedItem = '[data-test=list-IsConfirmed]'
const isShowItem = '[data-test=list-AppointmentIsShowByCustomer]'
const storeNameItem = '[data-test=list-StoreName]'
const vehicleItem = '[data-test=list-InterestedVehicle]'

let appointmentId
let appointmentDate
let appointmentTime

context('Appointment List Data Validation', () => {

  before(() => {
    cy.getAppointments().as('appointments')
  })

  describe('AllPerms User', () => {

    describe('All appointments', () => {
      before(() => {
        cy.login(powerUser)
        cy.createAppointment(salesAppointment, appt1Customer, testing1Store, allPermsUser)
          .then(resp => appointmentId = resp.body.id)
        appointmentDate = Cypress.moment().format(dateFormat)
        appointmentTime = Cypress.moment().format(timeFormat)
      })

      beforeEach(() => {
        cy.login(allPermsUser)
        cy.visit(allTabUrl)
      })

      it('Test 19 - Verify appointment shows Customer Name', () => {
        cy.getStaticCustomers().then(customers =>
          cy.get(customerNameItem).contains(customers[appt1Customer].name))
      })

      it('Test 24 - Verify the appointment Date is correct', () => {
        cy.get(appointmentDateItem).contains(appointmentDate)
      })

      it('Test 25 - Verify the appointment Time is correct', () => {
        cy.get(appointmentTimeItem).contains(appointmentTime)
      })

      it('Test 31 - Verify the appointment has the correct Associate assigned', () => {
        cy.getUsers().then(users =>
          cy.get(associateItem).contains(users[allPermsUser].name))
      })

      it('Test 32 - Verify the appointment has the correct Ceated By User', () => {
        cy.getUsers().then(users =>
          cy.get(createdByItem).contains(users[powerUser].name))
      })

      after(() => {
        cy.deleteAppointment(appointmentId, testing1Store)
      })
    })

    describe('Sales appointments', () => {
      before(() => {
        cy.login(powerUser)
        cy.createAppointment(salesAppointment, appt1Customer, testing1Store, allPermsUser)
          .then(resp => appointmentId = resp.body.id)
      })

      it('Test 20 - Verify appointment type is Sales', function() {
        cy.login(allPermsUser)
        cy.visit(salesTabUrl)
        cy.get(appointmentTypeItem).contains(this.appointments[salesAppointment].type)
      })

      after(() => {
        cy.deleteAppointment(appointmentId, testing1Store)
      })
    })

    describe('Delivery appointments', () => {
      before(() => {
        cy.login(powerUser)
        cy.createAppointment(deliveryAppointment, appt1Customer, testing1Store, allPermsUser)
          .then(resp => appointmentId = resp.body.id)
      })

      it('Test 21 - Verify the appointment type is Delivery', function() {
        cy.login(allPermsUser)
        cy.visit(deliveryTabUrl)
        cy.get(appointmentTypeItem).contains(this.appointments[deliveryAppointment].type)
      })

      after(() => {
        cy.deleteAppointment(appointmentId, testing1Store)
      })
    })

    describe('Service appointments', () => {
      before(() => {
        cy.login(powerUser)
        cy.createAppointment(serviceAppointment, appt1Customer, testing1Store, allPermsUser)
          .then(resp => appointmentId = resp.body.id)
      })

      it('Test 22 - Verify the appointment type is Service', function() {
        cy.login(allPermsUser)
        cy.visit(serviceTabUrl)
        cy.get(appointmentTypeItem).contains(this.appointments[serviceAppointment].type)
      })

      after(() => {
        cy.deleteAppointment(appointmentId, testing1Store)
      })
    })

    describe('General appointments', () => {
      before(() => {
        cy.login(powerUser)
        cy.createAppointment(generalAppointment, appt1Customer, testing1Store, allPermsUser)
          .then(resp => appointmentId = resp.body.id)
      })

      it('Test 23 - Verify the appointment type is General', function() {
        cy.login(allPermsUser)
        cy.visit(generalTabUrl)
        cy.get(appointmentTypeItem).contains(this.appointments[generalAppointment].type)
      })
    
      after(() => {
        cy.deleteAppointment(appointmentId, testing1Store)
      })
    })
  })
})
