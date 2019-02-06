
//Need to remove .wait from all places. Right now we don't have good way of element finding,
//once data-test tags implemented we can remove
//all .within() in turn we can just remove .wait

import Utils from './../../Utils';

import * as SalesHomeElements from './../../HTMLElementSelectors/SalesHome.json';
import * as CustomerCardElements from './../../HTMLElementSelectors/CustomerCard.json';
import * as CustomerContactCardElements from './../../HTMLElementSelectors/CustomerContactCard.json';
import * as EditCustomerDialogElements from './../../HTMLElementSelectors/EditCustomerDialog.json';
import * as AddNewCustomerDialogElements from './../../HTMLElementSelectors/AddNewCustomerDialog.json';


import * as salespersons from './../../fixtures/salespersons.json';
import * as vehicles from './../../fixtures/vehicles.json';

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
      cy.route({
        method: 'POST',
        url: '/api/customers/*/primary-sales/*',
      }).as('addPrimarySalesPerson')
      cy.route({
        method: 'POST',
        url: '/api/customers/*/secondary-sales/*',
      }).as('addSecondarySalesPerson')
      cy.route({
        method: 'POST',
        url: '/api/customers/*/primary-sales',
      }).as('removePrimarySalesPerson')
      cy.route({
        method: 'POST',
        url: '/api/customers/*/secondary-sales',
      }).as('removeSecondarySalesPerson')
      cy.route({
        method: 'POST',
        url: '/api/customers/*/bdc/*',
      }).as('addBDC')
      cy.route({
        method: 'DELETE',
        url: '/api/customers/*/bdc/*',
      }).as('removeBDC')
      cy.route({
        method: 'POST',
        url: '/api/customers/*/service-bdc/*',
      }).as('addServiceBDC')
      cy.route({
        method: 'DELETE',
        url: '/api/customers/*/service-bdc/*',
      }).as('removeServiceBDC')
      cy.route({
        method: 'POST',
        url: '/api/customers/*/vehicles/garage',
      }).as('addVehicleInGarage')
      cy.route({
        method: 'DELETE',
        url: '/api/deals/*/vehicles/*',
      }).as('removeVehicleInGarage')
    })

    afterEach(() => {
    })

    after(() => {
      cy.get(CustomerCardElements.contact_card_button).click({force: true})
      cy.get(CustomerCardElements.close_div).click({force: true})
      cy.logoutUI()
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
      cy.get(CustomerContactCardElements.contact_details_edit_button).first().should("be.visible")
      cy.get(CustomerContactCardElements.contact_details_edit_button).first().click()
      cy.get(EditCustomerDialogElements.main_div).should("be.visible")
      cy.get(EditCustomerDialogElements.main_div).contains("Edit Customer")
      cy.get(EditCustomerDialogElements.close_dialog).click()
    })

    it('Test 6 - Navigate to Customer Notes tab in customer contact window', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Cust. Notes").click()
      cy.get(CustomerContactCardElements.customer_notes_textarea).should("be.visible")
    })

    it('Test 7 - Save the Notes in the customer notes ', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Cust. Notes").click()
      cy.get(CustomerContactCardElements.customer_notes_textarea).should("be.visible")
      let notes = "Test Customer Notes "+(new Date()).getTime()
      cy.get(CustomerContactCardElements.customer_notes_textarea).type(notes)
      cy.get(CustomerContactCardElements.customer_notes_save).click()
      cy.wait('@saveNotes').then((xhr) => {
        cy.get(CustomerContactCardElements.customer_notes_list).contains(notes);
      })
    })

    it('Test 8 - Edit the customer notes', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Cust. Notes").click()
      cy.get(CustomerContactCardElements.customer_notes_textarea).should("be.visible")
      cy.wait('@getNotes').then((xhr) => {
        cy.get(CustomerContactCardElements.customer_notes_list_items).then(($list) => {
          if($list.length > 0){
            cy.get(CustomerContactCardElements.customer_notes_list_items).first().within(() => {
              cy.get(CustomerContactCardElements.customer_notes_list_items_actions).contains("Edit").click()
              let notes = "Test Customer Notes Edit "+(new Date()).getTime();
              cy.get("textarea").clear().type(notes);
              cy.get(CustomerContactCardElements.customer_notes_list_items_edit_actions).contains("Save").click()
              cy.wait("@editNotes").then((xhr) => {
                cy.contains(notes);
              })
            })
          }
        })
      })
    })

    it('Test 9 - Cancel edited customer notes ', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Cust. Notes").click()
      cy.get(CustomerContactCardElements.customer_notes_textarea).should("be.visible")
      cy.wait('@getNotes').then((xhr) => {
        cy.get(CustomerContactCardElements.customer_notes_list_items).then(($list) => {
          if($list.length > 0){
            cy.get(CustomerContactCardElements.customer_notes_list_items).first().within(() => {
              cy.get(CustomerContactCardElements.customer_notes_list_items_notes_text).invoke("text").then((text) => {
                cy.get(CustomerContactCardElements.customer_notes_list_items_actions).contains("Edit").click()
                cy.get("textarea").clear().type("hi");
                cy.get(CustomerContactCardElements.customer_notes_list_items_edit_actions).contains("Cancel").click()
                cy.contains(text);
              })
            })
          }
        })
      })
    })

    it('Test 10 - Delete customer notes with No in confirmation ', () => {
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
            cy.get(CustomerContactCardElements.dialog_actions).contains("No").click()
            cy.get(CustomerContactCardElements.customer_notes_list_items).first().within(() => {
              cy.get(CustomerContactCardElements.customer_notes_list_items_notes_text).contains(textOld);
            })
          }
        })
      })
    })

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

    it('Test 12 - Verify that Details tab in the customer contact card', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_salesperson_header).contains("Salesperson")
      cy.get(CustomerContactCardElements.details_tab_bdc_header).contains("BDC")
      cy.get(CustomerContactCardElements.details_tab_service_bdc_header).contains("Service BDC")
      cy.get(CustomerContactCardElements.details_tab_garage_header).contains("Garage")
    })

    it('Test 13 - Verify +symbol is available to add the salesperson', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_salesperson_add_li).then(($list) => {
        expect($list.length).to.equal(2)
      })
    })

    it('Test 14 - Add a salesperson to the customer from customer contact card', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_salesperson_add_li)
        .each(($el, index, $list) => {
          cy.wrap($el).within(() => {
            cy.get(CustomerContactCardElements.details_tab_salesperson_add_li_plusbutton).click()
            cy.get(CustomerContactCardElements.details_tab_salesperson_search_user_input).clear().type(salespersons[index].name)
            cy.get(CustomerContactCardElements.details_tab_salesperson_search_user_results).first().click()
            let waitFor = "@addPrimarySalesPerson";
            if(index > 0){
              waitFor = "@addSecondarySalesPerson";
            }
              cy.wait(waitFor).then((xhr) => {
                cy.wait(4000)
              })
          })
        })
      cy.wait(4000)
      cy.get(CustomerContactCardElements.details_tab_salesperson_add_li)
        .each(($el, index, $list) => {
          cy.wrap($el).within(() => {
            cy.get(CustomerContactCardElements.details_tab_salesperson_list_name).contains(salespersons[index].name)
          })
        })
    })

    it('Test 15 - Remove salesperson from the customer', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_salesperson_add_li).last().within(() => {
        cy.get(CustomerContactCardElements.details_tab_assigned_salesperson_avatar).click()
        cy.get(CustomerContactCardElements.details_tab_salespersons_actions).should('be.visible')
        cy.get(CustomerContactCardElements.details_tab_salespersons_actions).contains("Remove").click()
          let waitFor = "@removeSecondarySalesPerson";
          cy.wait(waitFor).then((xhr) => {
            cy.wait(4000)
          })
      })
      cy.get(CustomerContactCardElements.details_tab_salesperson_add_li).first().within(() => {
        cy.get(CustomerContactCardElements.details_tab_assigned_salesperson_avatar).click()
        cy.get(CustomerContactCardElements.details_tab_salespersons_actions).should('be.visible')
        cy.get(CustomerContactCardElements.details_tab_salespersons_actions).contains("Remove").click()
          let waitFor = "@removePrimarySalesPerson";
          cy.wait(waitFor).then((xhr) => {
            cy.wait(4000)
          })
      })
      cy.wait(4000)
      cy.get(CustomerContactCardElements.details_tab_salesperson_add_li)
        .each(($el, index, $list) => {
          cy.wrap($el).within(() => {
            cy.get(CustomerContactCardElements.details_tab_salesperson_add_li_plusbutton).should('be.visible')
          })
        })
    })

    it('Test 16 - Verify +symbol is available to add the BDC', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_bdc_add_li).then(($list) => {
        expect($list.length).to.equal(1)
      })
    })

    it('Test 17 - Add a BDC to the customer from customer contact card ', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_bdc_add_li).first().within(() => {
          cy.get(CustomerContactCardElements.details_tab_bdc_add_li_plusbutton).click()
          cy.get(CustomerContactCardElements.details_tab_bdc_search_user_input).clear().type(salespersons[0].name)
          cy.get(CustomerContactCardElements.details_tab_bdc_search_user_results).first().click()
            cy.wait("@addBDC").then((xhr) => {
              cy.wait(4000)
            })
        })
      cy.wait(4000)
      cy.get(CustomerContactCardElements.details_tab_bdc_add_li)
        .each(($el, index, $list) => {
          cy.wrap($el).within(() => {
            cy.get(CustomerContactCardElements.details_tab_bdc_list_name).contains(salespersons[0].name)
          })
        })
    })

    it('Test 18 - Remove bdc from the customer', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_bdc_add_li).first().within(() => {
        cy.get(CustomerContactCardElements.details_tab_assigned_bdc_avatar).click()
        cy.get(CustomerContactCardElements.details_tab_bdc_actions).should('be.visible')
        cy.get(CustomerContactCardElements.details_tab_bdc_actions).contains("Remove").click()
          cy.wait("@removeBDC").then((xhr) => {
            cy.wait(4000)
          })
      })
      cy.wait(4000)
      cy.get(CustomerContactCardElements.details_tab_bdc_add_li)
        first().within(() => {
        cy.get(CustomerContactCardElements.details_tab_bdc_add_li_plusbutton).should('be.visible')
      })
    })

    it('Test 19 - Verify +symbol is available to add the Service BDC', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_service_bdc_add_li).then(($list) => {
        expect($list.length).to.equal(1)
      })
      cy.get(CustomerContactCardElements.details_tab_service_bdc_add_li).first().within(() => {
        cy.get(CustomerContactCardElements.details_tab_service_bdc_add_li_plusbutton).should('be.visible')
      })
    })

    it('Test 20 - Add a Service BDC to the customer from customer contact card ', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_service_bdc_add_li).first().within(() => {
          cy.get(CustomerContactCardElements.details_tab_service_bdc_add_li_plusbutton).click()
          cy.get(CustomerContactCardElements.details_tab_service_bdc_search_user_input).clear().type(salespersons[0].name)
          cy.get(CustomerContactCardElements.details_tab_service_bdc_search_user_results).first().click()
            cy.wait("@addServiceBDC").then((xhr) => {
              cy.wait(4000)
            })
        })
      cy.wait(4000)
      cy.get(CustomerContactCardElements.details_tab_service_bdc_add_li)
        .each(($el, index, $list) => {
          cy.wrap($el).within(() => {
            cy.get(CustomerContactCardElements.details_tab_service_bdc_list_name).contains(salespersons[0].name)
          })
        })
    })

    it('Test 21 - Remove Service bdc from the customer', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_service_bdc_add_li).first().within(() => {
        cy.get(CustomerContactCardElements.details_tab_assigned_service_bdc_avatar).click()
        cy.get(CustomerContactCardElements.details_tab_service_bdc_actions).should('be.visible')
        cy.get(CustomerContactCardElements.details_tab_service_bdc_actions).contains("Remove").click()
          cy.wait("@removeServiceBDC").then((xhr) => {
            cy.wait(4000)
          })
      })
      cy.wait(4000)
      cy.get(CustomerContactCardElements.details_tab_service_bdc_add_li)
        .first().within(() => {
        cy.get(CustomerContactCardElements.details_tab_service_bdc_add_li_plusbutton).should('be.visible')
      })
    })

    it('Test 22 - Verify +symbol is available to add the Garage', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_garage_add_li).first().within(() => {
        cy.get(CustomerContactCardElements.details_tab_garage_add_li_plusbutton).scrollIntoView()
      })
    })

    it('Test 23 - Add a vehicle under Garage section to the customer from customer contact card ', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_garage_add_li).first().within(() => {
        cy.get(CustomerContactCardElements.details_tab_garage_add_li_plusbutton).click()
      })
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_status).select(vehicles[0].status)
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_year).type(vehicles[0].year)
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_make).type(vehicles[0].make)
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_model).type(vehicles[0].model)
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_trim).type(vehicles[0].trim)
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_stock).type(vehicles[0].stock)
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_vim).type(vehicles[0].vim)
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_mileage).type(vehicles[0].mileage)
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_price).type(vehicles[0].price)
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_acv).type(vehicles[0].acv)
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_interior).type(vehicles[0].interior)
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_exterior).type(vehicles[0].exterior)
      cy.get(CustomerContactCardElements.details_tab_garage_add_vehicle_actions).within(()=>{
        cy.contains('Add').click()
      })
      cy.wait("@addVehicleInGarage").then((xhr) => {
        cy.wait(4000)
        cy.get(CustomerContactCardElements.details_tab_garage_add_li).first().within(() => {
          cy.get(CustomerContactCardElements.details_tab_garage_list_name).contains(vehicles[0].year)
          cy.get(CustomerContactCardElements.details_tab_garage_list_name).contains(vehicles[0].make)
          cy.get(CustomerContactCardElements.details_tab_garage_list_name).contains(vehicles[0].model)
        })
      })
    })

    it('Test 24 - Validate NO button in delete vehicle confirmation window while removing the vehicle from Garage', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_garage_add_li).first().within(() => {
        cy.get(CustomerContactCardElements.details_tab_garage_list_remove_vehicle).click({force: true})
      })
      cy.get(CustomerContactCardElements.dialog_content_div).should('be.visible')
      cy.get(CustomerContactCardElements.dialog_content_div).contains("Are you sure you want to delete this vehicle?")
      cy.get(CustomerContactCardElements.dialog_actions).contains("No").click()
      cy.get(CustomerContactCardElements.details_tab_garage_add_li).first().within(() => {
        cy.get(CustomerContactCardElements.details_tab_garage_list_name).contains(vehicles[0].year)
        cy.get(CustomerContactCardElements.details_tab_garage_list_name).contains(vehicles[0].make)
        cy.get(CustomerContactCardElements.details_tab_garage_list_name).contains(vehicles[0].model)
      })
    })

    it('Test 25 - Remove added vehicle under Garage from customer card', () => {
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Details").click()
      cy.get(CustomerContactCardElements.details_tab_garage_add_li).first().within(() => {
        cy.get(CustomerContactCardElements.details_tab_garage_list_remove_vehicle).click({force: true})
      })
      cy.get(CustomerContactCardElements.dialog_content_div).should('be.visible')
      cy.get(CustomerContactCardElements.dialog_content_div).contains("Are you sure you want to delete this vehicle?")
      cy.get(CustomerContactCardElements.dialog_actions).contains("Yes").click()
      cy.wait("@removeVehicleInGarage").then((xhr) => {
        cy.wait(4000)
        cy.get(CustomerContactCardElements.details_tab_garage_add_li).first().within(() => {
          cy.get(CustomerContactCardElements.details_tab_garage_add_li_plusbutton).scrollIntoView()
        })
      })
    })

	it('Test 26 - Verify the headers under open tab from customer card', () => {
	  //Click on the open tab
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Open").click()
	  
	  //Verify the herad in the open tab page
      cy.get(CustomerContactCardElements.open_tab_headers).should('be.visible').then(function($lis){
		  expect($lis).to.have.length(4)
          expect($lis.eq(0)).to.contain('Deal')
		  expect($lis.eq(1)).to.contain('Interested')
		  expect($lis.eq(2)).to.contain('Trade')
		  expect($lis.eq(3)).to.contain('Source')
        })
		//Verify the details are present
		cy.get(CustomerContactCardElements.open_tab_customer_sections).first().within(() => {
          cy.get(CustomerContactCardElements.open_tab_customer_sections_details).contains('days')
        })
    })
	
	it('Test 27 - Add vehicle from customer contact card under "Interested" section', () => {
	  //Click on the open tab
      cy.get(CustomerContactCardElements.main_tabs_parent_div).contains("Open").click()
	  
	  //Verify the details are present
	  cy.get(CustomerContactCardElements.open_tab_interested_section).first().within(() => {
         cy.get(CustomerContactCardElements.add_interested_plussymbol).should('be.visible').click()
      })
	  
	  //Wait for the Add Inventory dialog Options
	  cy.get(AddNewCustomerDialogElements.add_inventory_dialog_options).should('have.length', 7)
	  
	  //Click on the Year and then click the first values of Year
	  cy.get(AddNewCustomerDialogElements.add_inventory_dialog_options).eq(1).should('be.visible').contains('Year').click()
      cy.wait(3000)	 
	  cy.get(AddNewCustomerDialogElements.add_inventory_year_list).first().scrollIntoView()
	  cy.get(AddNewCustomerDialogElements.add_inventory_year_list).first().should('be.visible').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_search_tags).should('be.visible')
	  	  
	  //Click on add vehicle button
	  cy.get(AddNewCustomerDialogElements.add_vehicle_button).first().should('be.visible').contains('Add Vehicle').click()	
		
		//Verify the details are present
	  cy.get(CustomerContactCardElements.open_tab_interested_section).first().within(() => {
         cy.get(CustomerContactCardElements.add_interested_plussymbol).should('be.visible')
      })
    })


  })

})
