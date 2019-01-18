
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
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
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
      cy.route({
        method: 'POST',
        url: '/api/customers/*/note',
      }).as('saveNotes')
      cy.route({
        method: 'GET',
        url: '/api/customers/*/notes',
      }).as('getNotes')
      cy.route({
        method: 'PATCH',
        url: '/api/customers/notes/*',
      }).as('editNotes')
      cy.route({
        method: 'DELETE',
        url: '/api/customers/notes/*',
      }).as('deleteNotes')
    })

    afterEach(() => {
    })

    after(() => {
      cy.get(CustomerCardElements.contact_card_button).click({force: true})
      cy.get(CustomerCardElements.close_div).click({force: true})
      cy.logoutUI()
    })

    // it('Test 1 - Verify customer contact window', () => {
    //   cy.get(CustomerContactCardElements.main_div).should('be.visible')
    // })

    // it('Test 2 - Verify customer contact window focused on Contact tab by default', () => {
    //   cy.get(CustomerContactCardElements.main_active_tab).contains("Contact")
    // })

    // it('Test 3 - Verify Best method under contact tab', () => {
    //   cy.get(CustomerContactCardElements.graph_bars)
    //     .each(($el, index, $list) => {
    //       cy.wrap($el).should('have.attr', 'fill').and('match',/rgb\(65, 130, 215\)|rgb\(25, 180, 255\)|rgb\(45, 205, 115\)/)
    //     })
    // })

    // it('Test 4 - Validate customer phone number under contact details in Contact tab.', () => {
    //   cy.get(CustomerContactCardElements.contact_details_div).should("be.visible")
    // })

    // it('Test 5 - Navigate to Edit customer window from customer contact card', () => {
    //   cy.get(CustomerContactCardElements.contact_details_edit_button).first().should("be.visible")
    //   cy.get(CustomerContactCardElements.contact_details_edit_button).first().click()
    //   cy.get(EditCustomerDialogElements.main_div).should("be.visible")
    //   cy.get(EditCustomerDialogElements.main_div).contains("Edit Customer")
    //   cy.get(EditCustomerDialogElements.close_dialog).click()
    // })

    // it('Test 6 - Navigate to Customer Notes tab in customer contact window', () => {
    //   cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Cust. Notes").click()
    //   cy.get(CustomerContactCardElements.customer_notes_textarea).should("be.visible")
    // })

    // it('Test 7 - Save the Notes in the customer notes ', () => {
    //   cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Cust. Notes").click()
    //   cy.get(CustomerContactCardElements.customer_notes_textarea).should("be.visible")
    //   let notes = "Test Customer Notes "+(new Date()).getTime()
    //   cy.get(CustomerContactCardElements.customer_notes_textarea).type(notes)
    //   cy.get(CustomerContactCardElements.customer_notes_save).click()
    //   cy.wait('@saveNotes').then((xhr) => {
    //     cy.get(CustomerContactCardElements.customer_notes_list).contains(notes);
    //   })
    // })

    // it('Test 8 - Edit the customer notes', () => {
    //   cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Cust. Notes").click()
    //   cy.get(CustomerContactCardElements.customer_notes_textarea).should("be.visible")
    //   cy.wait('@getNotes').then((xhr) => {
    //     cy.get(CustomerContactCardElements.customer_notes_list_items).then(($list) => {
    //       if($list.length > 0){
    //         cy.get(CustomerContactCardElements.customer_notes_list_items).first().within(() => {
    //           cy.get(CustomerContactCardElements.customer_notes_list_items_actions).contains("Edit").click()
    //           let notes = "Test Customer Notes Edit "+(new Date()).getTime();
    //           cy.get("textarea").clear().type(notes);
    //           cy.get(CustomerContactCardElements.customer_notes_list_items_edit_actions).contains("Save").click()
    //           cy.wait("@editNotes").then((xhr) => {
    //             cy.contains(notes);
    //           })
    //         })
    //       }
    //     })
    //   })
    // })

    // it('Test 9 - Cancel edited customer notes ', () => {
    //   cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Cust. Notes").click()
    //   cy.get(CustomerContactCardElements.customer_notes_textarea).should("be.visible")
    //   cy.wait('@getNotes').then((xhr) => {
    //     cy.get(CustomerContactCardElements.customer_notes_list_items).then(($list) => {
    //       if($list.length > 0){
    //         cy.get(CustomerContactCardElements.customer_notes_list_items).first().within(() => {
    //           cy.get(CustomerContactCardElements.customer_notes_list_items_notes_text).invoke("text").then((text) => {
    //             cy.get(CustomerContactCardElements.customer_notes_list_items_actions).contains("Edit").click()
    //             cy.get("textarea").clear().type("hi");
    //             cy.get(CustomerContactCardElements.customer_notes_list_items_edit_actions).contains("Cancel").click()
    //             cy.contains(text);
    //           })
    //         })
    //       }
    //     })
    //   })
    // })

    // it('Test 10 - Delete customer notes with No in confirmation ', () => {
    //   cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Cust. Notes").click()
    //   cy.get(CustomerContactCardElements.customer_notes_textarea).should("be.visible")
    //   cy.wait('@getNotes').then((xhr) => {
    //     cy.get(CustomerContactCardElements.customer_notes_list_items).then(($list) => {
    //       if($list.length > 0){
    //         let textOld = "";
    //         cy.get(CustomerContactCardElements.customer_notes_list_items).first().within(() => {
    //           cy.get(CustomerContactCardElements.customer_notes_list_items_notes_text).invoke("text").then((text) => {
    //             textOld = text;
    //           })
    //           cy.get(CustomerContactCardElements.customer_notes_list_items_actions).contains("Delete").click()
    //         })
    //         cy.get(CustomerContactCardElements.dialog_content_div).should('be.visible')
    //         cy.get(CustomerContactCardElements.dialog_content_div).contains("Are you sure you want to delete this note?")
    //         cy.get(CustomerContactCardElements.dialog_actions).contains("No").click()
    //         cy.get(CustomerContactCardElements.customer_notes_list_items).first().within(() => {
    //           cy.get(CustomerContactCardElements.customer_notes_list_items_notes_text).contains(textOld);
    //         })
    //       }
    //     })
    //   })
    // })

    it('Test 11 - Delete customer notes with Yes in confirmation ', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Cust. Notes").click()
      cy.get(CustomerContactCardElements.customer_notes_textarea).should("be.visible")
      cy.wait('@getNotes').then((xhr) => {
        cy.get(CustomerContactCardElements.customer_notes_list_items).then(($list) => {
          if($list.length > 0){
            let textOld = "";
            cy.get(CustomerContactCardElements.customer_notes_list_items).first().within(() => {
              cy.get(CustomerContactCardElements.customer_notes_list_items_notes_text).invoke("text").then((text) => {
                textOld = text;
              })
              cy.get(CustomerContactCardElements.customer_notes_list_items_actions).contains("Delete").click()
            })
            cy.get(CustomerContactCardElements.dialog_content_div).should('be.visible')
            cy.get(CustomerContactCardElements.dialog_content_div).contains("Are you sure you want to delete this note?")
            cy.get(CustomerContactCardElements.dialog_actions).contains("Yes").click()
            cy.wait('@deleteNotes').then((xhr) => {
              cy.wait('@getNotes').then((xhr) => {
                cy.wait(4000)
                cy.get(CustomerContactCardElements.customer_notes_list).then(($listParent) => {
                  if($listParent.children().length > 0){
                    cy.get(CustomerContactCardElements.customer_notes_list_items).first().within(() => {
                      cy.get(CustomerContactCardElements.customer_notes_list_items_notes_text).should('not.contain', textOld)
                    })
                  }
                })
              })
            })
          }
        })
      })
    })

  })

})
