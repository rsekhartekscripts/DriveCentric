const listHeader = '[data-test=filterbar-span-title]'
const allTab = '[data-test=list-header-LibraryTopTabAllAppointmentsToday]'
const salesTab = '[data-test=list-header-LibraryTopTabSalesAppointmentsToday]'
const deliveryTab = '[data-test=list-header-LibraryTopTabDeliveryAppointmentsToday]'
const serviceTab = '[data-test=list-header-LibraryTopTabServiceAppointmentsToday]'
const generalTab = '[data-test=list-header-LibraryTopTabGenericAppointmentsToday]'

context('Appointment List Empty State', () => {

  describe('NoData User', () => {

    beforeEach(() => {
      cy.login('noData')
    })

    it('Test 9 - All Tab', () => {
      cy.visit('#/list/All/LibraryTopTabAllAppointmentsToday/0/')
      cy.get(listHeader).contains('0')
      cy.get(listHeader).contains('All')
      cy.get(allTab).contains('0')
      cy.get(allTab).contains('All')
    })

    it('Test 10 - Sales Tab', () => {
      cy.visit('#/list/Sales/LibraryTopTabSalesAppointmentsToday/0/')
      cy.get(listHeader).contains('0')
      cy.get(listHeader).contains('Sales')
      cy.get(salesTab).contains('0')
      cy.get(salesTab).contains('Sales')
    })

    it('Test 11 - Delivery Tab', () => {
      cy.visit('#/list/Delivery/LibraryTopTabDeliveryAppointmentsToday/0/')
      cy.get(listHeader).contains('0')
      cy.get(listHeader).contains('Delivery')
      cy.get(deliveryTab).contains('0')
      cy.get(deliveryTab).contains('Delivery')
    })

    it('Test 12 - Service Tab', () => {
      cy.visit('#/list/Service/LibraryTopTabServiceAppointmentsToday/0/')
      cy.get(listHeader).contains('0')
      cy.get(listHeader).contains('Service')
      cy.get(serviceTab).contains('0')
      cy.get(serviceTab).contains('Service')
    })

    it('Test 13 - General Tab', () => {
      cy.visit('#/list/General/LibraryTopTabGenericAppointmentsToday/0/')
      cy.get(listHeader).contains('0')
      cy.get(listHeader).contains('General')
      cy.get(generalTab).contains('0')
      cy.get(generalTab).contains('General')
    })
  })
})
