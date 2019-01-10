
//Need to remove .wait from all places. Right now we don't have good way of element finding,
//once data-test tags implemented we can remove
//all .within() in turn we can just remove .wait

import Utils from './../../Utils';

import * as AddNewCustomerDialogElements from './../../HTMLElementSelectors/AddNewCustomerDialog.json';
import * as SalesHomeElements from './../../HTMLElementSelectors/SalesHome.json';
import * as CustomerSearchDialogElements from './../../HTMLElementSelectors/CustomerSearchDialog.json';

import * as customersList from './../../fixtures/customers.json';
const customer = customersList[0];

const individualType = "Individual";
const companyType = "Company";




context('Add New Customer', () => {

  describe('Enterprise User - Add New Customer Dialog Navigation From Search Dialog', () => {

    before(() => {
      cy.loginUI('enterprise')
    })

    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(SalesHomeElements.add_new_customer_button).click()
    })

    afterEach(() => {
      cy.get(SalesHomeElements.add_new_customer_dialog).within(()=>{
        cy.contains(AddNewCustomerDialogElements.cancel_button).click({force: true})
      })
      cy.wait(2000)
      cy.get(CustomerSearchDialogElements.close_dialog_button).click({force: true})
    })



    it('Test 1 - Check Add Customer Dialog Visibility and Form Fields Validation', () => {
      cy.get(CustomerSearchDialogElements.first_name_input).clear()
      cy.get(CustomerSearchDialogElements.first_name_input).type(customer.firstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button).click()
        cy.get(SalesHomeElements.add_new_customer_dialog).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customer_type_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customer_type_input).select(individualType)
        cy.get(AddNewCustomerDialogElements.first_name_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.last_name_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.company_name_input).should('not.be.visible')
        cy.get(AddNewCustomerDialogElements.email_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.phone_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.home_phone_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.address_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.city_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.state_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.zip_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.store_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.source_type_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.source_description_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.sales_people_div).should('be.visible')
        cy.get(AddNewCustomerDialogElements.bdc_div).should('be.visible')
        cy.get(AddNewCustomerDialogElements.interested_vehicle_div).contains("Interested Vehicle")
        cy.get(AddNewCustomerDialogElements.trade_in_div).contains("Trade-In")

        cy.get(AddNewCustomerDialogElements.customer_type_input).select(companyType)
        cy.get(AddNewCustomerDialogElements.first_name_input).should('not.be.visible')
        cy.get(AddNewCustomerDialogElements.last_name_input).should('not.be.visible')
        cy.get(AddNewCustomerDialogElements.company_name_input).should('be.visible')
      })
    })

    it('Test 2 - Check Individual Values entered in search dialog with Add New Customer dialog', () => {
      cy.get(CustomerSearchDialogElements.company_input).clear()
      cy.get(CustomerSearchDialogElements.first_name_input).clear()
      cy.get(CustomerSearchDialogElements.first_name_input).type(customer.firstName)
      cy.get(CustomerSearchDialogElements.last_name_input).clear()
      cy.get(CustomerSearchDialogElements.last_name_input).type(customer.lastName)
      cy.get(CustomerSearchDialogElements.phone_input).clear()
      cy.get(CustomerSearchDialogElements.phone_input).type(customer.phone)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button).click()
        cy.get(AddNewCustomerDialogElements.phone_input).should('have.value', Utils.getMaskedPhone(customer.phone))
        cy.get(SalesHomeElements.add_new_customer_dialog).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customer_type_input).find(':selected').contains(individualType)
        cy.get(AddNewCustomerDialogElements.first_name_input).should('have.value', customer.firstName)
        cy.get(AddNewCustomerDialogElements.last_name_input).should('have.value', customer.lastName)
      })
    })

    it('Test 3 - Check Company Values entered in search dialog with Add New Customer dialog', () => {
      cy.get(CustomerSearchDialogElements.first_name_input).clear()
      cy.get(CustomerSearchDialogElements.last_name_input).clear()
      cy.get(CustomerSearchDialogElements.company_input).clear()
      cy.get(CustomerSearchDialogElements.company_input).type(customer.companyName)
      cy.get(CustomerSearchDialogElements.phone_input).clear()
      cy.get(CustomerSearchDialogElements.email_input).clear()
      cy.get(CustomerSearchDialogElements.email_input).type(customer.email)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button).click()
        cy.get(SalesHomeElements.add_new_customer_dialog).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customer_type_input).find(':selected').contains(companyType)
        cy.get(AddNewCustomerDialogElements.company_name_input).should('have.value', customer.companyName)
        cy.get(AddNewCustomerDialogElements.email_input).should('have.value', customer.email)
      })
    })


    it('Test 4 - Verify Type field value, if user enters first name and last name in Add new customer search window.', () => {
      cy.get(CustomerSearchDialogElements.first_name_input).clear()
      cy.get(CustomerSearchDialogElements.last_name_input).clear()
      cy.get(CustomerSearchDialogElements.company_input).clear()
      cy.get(CustomerSearchDialogElements.phone_input).clear()
      cy.get(CustomerSearchDialogElements.email_input).clear()
      cy.get(CustomerSearchDialogElements.first_name_input).type(customer.firstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button).click()
        cy.get(SalesHomeElements.add_new_customer_dialog).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customer_type_input).find(':selected').contains(individualType)
      })
    })

    it('Test 5 - Verify Type field value, if user enters Company Name in Add new customer search window.', () => {
      cy.get(CustomerSearchDialogElements.first_name_input).clear()
      cy.get(CustomerSearchDialogElements.last_name_input).clear()
      cy.get(CustomerSearchDialogElements.company_input).clear()
      cy.get(CustomerSearchDialogElements.phone_input).clear()
      cy.get(CustomerSearchDialogElements.email_input).clear()
      cy.get(CustomerSearchDialogElements.company_input).type(customer.companyName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button).click()
        cy.get(SalesHomeElements.add_new_customer_dialog).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customer_type_input).find(':selected').contains(companyType)
      })
    })

  })

})
