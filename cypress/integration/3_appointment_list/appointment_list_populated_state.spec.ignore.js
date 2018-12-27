const salesAppointment = 'todaySales'
const deliveryAppointment = 'todayDelivery'
const serviceAppointment = 'todayService'
const generalAppointment = 'todayGeneral'
const testing1Store = 'testing1'
const allPermsUser = 'allPerms'

const allTab = '[data-test=list-header-LibraryTopTabAllAppointmentsToday]'
const salesTab = '[data-test=list-header-LibraryTopTabSalesAppointmentsToday]'
const deliveryTab = '[data-test=list-header-LibraryTopTabDeliveryAppointmentsToday]'
const serviceTab = '[data-test=list-header-LibraryTopTabServiceAppointmentsToday]'
const generalTab = '[data-test=list-header-LibraryTopTabGenericAppointmentsToday]'
const headerTitle = '[data-test=filterbar-span-title]'
const listRow = '[data-test=list-row]'

const allTotal = 10
const salesTotal = 4
const deliveryTotal = 3
const serviceTotal = 2
const generalTotal = 1
const appointmentIds = []

context('Appointment List Populated State', () => {

  before(() => {
    cy.login('power')
    cy.createAppointment(salesAppointment, 'appt1', testing1Store, allPermsUser)
      .then(resp => appointmentIds.push(resp.body.id))
    cy.createAppointment(salesAppointment, 'appt2', testing1Store, allPermsUser)
      .then(resp => appointmentIds.push(resp.body.id))
    cy.createAppointment(salesAppointment, 'appt3', testing1Store, allPermsUser)
      .then(resp => appointmentIds.push(resp.body.id))
    cy.createAppointment(salesAppointment, 'appt4', testing1Store, allPermsUser)
      .then(resp => appointmentIds.push(resp.body.id))
    cy.createAppointment(deliveryAppointment, 'appt5', testing1Store, allPermsUser)
      .then(resp => appointmentIds.push(resp.body.id))
    cy.createAppointment(deliveryAppointment, 'appt6', testing1Store, allPermsUser)
      .then(resp => appointmentIds.push(resp.body.id))
    cy.createAppointment(deliveryAppointment, 'appt7', testing1Store, allPermsUser)
      .then(resp => appointmentIds.push(resp.body.id))
    cy.createAppointment(serviceAppointment, 'appt8', testing1Store, allPermsUser)
      .then(resp => appointmentIds.push(resp.body.id))
    cy.createAppointment(serviceAppointment, 'appt9', testing1Store, allPermsUser)
      .then(resp => appointmentIds.push(resp.body.id))
    cy.createAppointment(generalAppointment, 'appt10', testing1Store, allPermsUser)
      .then(resp => appointmentIds.push(resp.body.id))
  })

  describe('AllPerms User', () => {

    beforeEach(() => {
      cy.login(allPermsUser)
    })

    it('Test 14 - All tab counts', () => {
      cy.visit('#/list/All/LibraryTopTabAllAppointmentsToday/0/')
      cy.get(headerTitle).contains('All')
      cy.get(headerTitle).contains(allTotal)
      cy.get(allTab).contains('All')
      cy.get(allTab).contains(allTotal)
      cy.get(listRow).should('have.length', allTotal)
    })

    it('Test 15 - Sales tab counts', () => {
      cy.visit('#/list/Sales/LibraryTopTabSalesAppointmentsToday/0/')
      cy.get(headerTitle).contains('Sales')
      cy.get(headerTitle).contains(salesTotal)
      cy.get(salesTab).contains('Sales')
      cy.get(salesTab).contains(salesTotal)
      cy.get(listRow).should('have.length', salesTotal)
    })

    it('Test 16 - Delivery tab counts', () => {
      cy.visit('#/list/Delivery/LibraryTopTabDeliveryAppointmentsToday/0/')
      cy.get(headerTitle).contains('Delivery')
      cy.get(headerTitle).contains(deliveryTotal)
      cy.get(deliveryTab).contains('Delivery')
      cy.get(deliveryTab).contains(deliveryTotal)
      cy.get(listRow).should('have.length', deliveryTotal)
    })

    it('Test 17 - Service tab counts', () => {
      cy.visit('#/list/Service/LibraryTopTabServiceAppointmentsToday/0/')
      cy.get(headerTitle).contains('Service')
      cy.get(headerTitle).contains(serviceTotal)
      cy.get(serviceTab).contains('Service')
      cy.get(serviceTab).contains(serviceTotal)
      cy.get(listRow).should('have.length', serviceTotal)
    })

    it('Test 18 - General tab counts', () => {
      cy.visit('#/list/General/LibraryTopTabGenericAppointmentsToday/0/')
      cy.get(headerTitle).contains('General')
      cy.get(headerTitle).contains(generalTotal)
      cy.get(generalTab).contains('General')
      cy.get(generalTab).contains(generalTotal)
      cy.get(listRow).should('have.length', generalTotal)
    })
  })

  after(() => {
    for(let i=0; i<appointmentIds.length; i++) {
      cy.deleteAppointment(appointmentIds[i], testing1Store)
    }
  })
})
