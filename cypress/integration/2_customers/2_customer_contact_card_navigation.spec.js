
//Need to remove .wait from all places. Right now we don't have good way of element finding,
//once data-test tags implemented we can remove
//all .within() in turn we can just remove .wait

import Utils from './../../Utils';

import * as SalesHomeElements from './../../HTMLElementSelectors/SalesHome.json';
import * as CustomerCardElements from './../../HTMLElementSelectors/CustomerCard.json';
import * as CustomerContactCardElements from './../../HTMLElementSelectors/CustomerContactCard.json';


context('Customer Contact Card', () => {

  describe('All Perms User - Customer Contact Card Navigation', () => {

    before(() => {
      cy.loginUI('enterprise')
    })

    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
    })

    it('Test 1 - Verify customer contact window', () => {
      cy.get(SalesHomeElements.recent_customers_button).click()
      cy.wait('@legacy').then((xhr) => {
        cy.contains("Recent Customers")
        cy.get(SalesHomeElements.recent_customers_result_div).should('be.visible')
        cy.get(SalesHomeElements.recent_customers_result_div_loading).should('not.be.visible')
        cy.get(SalesHomeElements.recent_customers_result_div_list).then(($list) => {
          if($list.length > 0){
            cy.wrap($list).first().click()
            cy.get(CustomerCardElements.main_div).should('be.visible')
          }
        })
      })
    })

    it('Test 1 - Verify customer contact window focused on Contact tab by default', () => {
      cy.get(SalesHomeElements.recent_customers_button).click()
      cy.wait('@legacy').then((xhr) => {
        cy.contains("Recent Customers")
        cy.get(SalesHomeElements.recent_customers_result_div).should('be.visible')
        cy.get(SalesHomeElements.recent_customers_result_div_loading).should('not.be.visible')
        cy.get(SalesHomeElements.recent_customers_result_div_list).then(($list) => {
          if($list.length > 0){
            cy.wrap($list).first().click()
            cy.get(CustomerCardElements.main_div).should('be.visible')
          }
        })
      })
    })


  })

})
