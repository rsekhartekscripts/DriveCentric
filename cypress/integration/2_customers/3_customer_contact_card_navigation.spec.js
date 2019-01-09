
//Need to remove .wait from all places. Right now we don't have good way of element finding,
//once data-test tags implemented we can remove
//all .within() in turn we can just remove .wait

import Utils from './../../Utils';

import * as SalesHomeElements from './../../HTMLElementSelectors/SalesHome.json';
import * as CustomerCardElements from './../../HTMLElementSelectors/CustomerCard.json';
import * as CustomerContactCardElements from './../../HTMLElementSelectors/CustomerContactCard.json';
import * as EditCustomerDialogElements from './../../HTMLElementSelectors/EditCustomerDialog.json';


context('Customer Contact Card', () => {

  describe('Enterprise User - Customer Contact Card Navigation', () => {

    before(() => {
      cy.loginUI('enterprise')
    })

    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.route({
        method: 'GET',
        url: '/api/deals/*/vehicles/trades',
      }).as('trades')
      cy.route({
        method: 'POST',
        url: '/api/deals/*/vehicles/interested',
      }).as('interested')
      cy.route({
        method: 'POST',
        url: '/api/users/current',
      }).as('currentUser')
      cy.get(SalesHomeElements.recent_customers_button).click()
      cy.wait('@legacy').then((xhr) => {
        cy.contains("Recent Customers")
        cy.get(SalesHomeElements.recent_customers_result_div).should('be.visible')
        cy.get(SalesHomeElements.recent_customers_result_div_loading).should('not.be.visible')
        cy.get(SalesHomeElements.recent_customers_result_div_list).then(($list) => {
          if($list.length > 0){
            cy.wrap($list).first().click()
            cy.get(CustomerCardElements.main_div).should('be.visible')
            cy.get(CustomerCardElements.contact_card_button).should('be.visible')
            cy.get(CustomerCardElements.contact_card_button).click()
          }
        })
      })
    })

    afterEach(() => {
      cy.get(CustomerCardElements.contact_card_button).click()
      cy.get(CustomerCardElements.close_div).click()
    })

    it('Test 1 - Verify customer contact window', () => {
      cy.get(CustomerContactCardElements.main_div).should('be.visible')
    })

    it('Test 2 - Verify customer contact window focused on Contact tab by default', () => {
      cy.get(CustomerContactCardElements.main_active_tab).contains("Contact")
    })

    it('Test 3 - Verify Best method under contact tab', () => {
      cy.get(CustomerContactCardElements.graph_bars)
        .each(($el, index, $list) => {
          cy.wrap($el).should('have.attr', 'fill').and('match',/rgb\(65, 130, 215\)|rgb\(25, 180, 255\)|rgb\(45, 205, 115\)/)
        })
    })

    it('Test 4 - Validate customer phone number under contact details in Contact tab.', () => {
      cy.get(CustomerContactCardElements.contact_details_div).should("be.visible")
    })

    it('Test 5 - Navigate to Edit customer window from customer contact card', () => {
      cy.get(CustomerContactCardElements.contact_details_edit_button).should("be.visible")
      cy.get(CustomerContactCardElements.contact_details_edit_button).click()
      cy.get(EditCustomerDialogElements.main_div).should("be.visible")
      cy.get(EditCustomerDialogElements.main_div).contains("Edit Customer")
      cy.get(EditCustomerDialogElements.close_dialog).click()
    })

    it('Test 6 - Navigate to Customer Notes tab in customer contact window', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Cust. Notes").click()
      cy.get(CustomerContactCardElements.customer_notes_textarea).should("be.visible")
    })

    // it('Test 7 - Save the Notes in the customer notes ', () => {
    //   let notes = "Test Customer Notes "+(new Date()).getTime()
    //   cy.get(CustomerContactCardElements.customer_notes_textarea).type(notes)
    // })

  })

})
