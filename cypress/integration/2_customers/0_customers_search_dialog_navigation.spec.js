import * as SalesHomeElements from './../../HTMLElementSelectors/SalesHome.json';
import * as CustomerSearchDialogElements from './../../HTMLElementSelectors/CustomerSearchDialog.json';

const customer = {
    "firstName": "Appointment",
    "lastName": "One",
    "email": "testEmail@test.com",
    "phone": "9999999999",
    "companyName": "Test Company"
  }


context('Customer', () => {

  describe('All Perms User - Customer Search Dialog Navigation', () => {

    before(function () {
      cy.loginUI('enterprise')
    })

    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
    })

    it('Test 1 - Navigate to Search New Customer Dialog', () => {
      cy.get(SalesHomeElements.add_new_customer_button).click()
      cy.get(SalesHomeElements.customer_search_dialog).should('be.visible')
    })

    it('Test 2 - Check FirstName Search Results', () => {
      cy.get(CustomerSearchDialogElements.first_name_input).clear().type(customer.firstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button)
        cy.get(CustomerSearchDialogElements.first_name_input).clear()
      })
    })

    it('Test 3 - Check LastName Search Results', () => {
      cy.get(CustomerSearchDialogElements.last_name_input).clear().type(customer.lastName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button)
        cy.get(CustomerSearchDialogElements.last_name_input).clear()
      })
    })

    it('Test 4 - Check Company Search Results', () => {
      cy.get(CustomerSearchDialogElements.company_input).clear().type(customer.companyName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button)
        cy.get(CustomerSearchDialogElements.company_input).clear()
      })
    })

    it('Test 5 - Check PhoneNumber Search Results', () => {
      cy.get(CustomerSearchDialogElements.phone_input).clear().type(customer.phone)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button)
        cy.get(CustomerSearchDialogElements.phone_input).clear()
      })
    })

    it('Test 6 - Check Email Search Results', () => {
      cy.get(CustomerSearchDialogElements.email_input).clear().type(customer.email)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button)
        cy.get(CustomerSearchDialogElements.email_input).clear()
      })
    })

  })

})
