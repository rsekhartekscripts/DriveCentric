
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




context('Add New Customer Dialog', () => {

  describe('Enterprise User - Add New Customer Dialog Validations', () => {

    before(() => {
      cy.loginUI('enterprise')
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(SalesHomeElements.add_new_customer_button).click()
      cy.get(CustomerSearchDialogElements.company_input).clear()
      cy.get(CustomerSearchDialogElements.company_input).type(customer.companyName)
      cy.get(CustomerSearchDialogElements.first_name_input).clear()
      cy.get(CustomerSearchDialogElements.first_name_input).type(customer.firstName)
      cy.get(CustomerSearchDialogElements.last_name_input).clear()
      cy.get(CustomerSearchDialogElements.last_name_input).type(customer.lastName)
      cy.get(CustomerSearchDialogElements.phone_input).clear()
      cy.get(CustomerSearchDialogElements.phone_input).type(customer.phone)
      cy.get(CustomerSearchDialogElements.email_input).clear()
      cy.get(CustomerSearchDialogElements.email_input).type(customer.email)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button).click()
        cy.get(SalesHomeElements.add_new_customer_dialog).should('be.visible')
      })
    })

    after(() => {
      cy.get(SalesHomeElements.add_new_customer_dialog).within(()=>{
        cy.contains(AddNewCustomerDialogElements.cancel_button).click({force: true})
      })
      cy.wait(2000)
      cy.get(CustomerSearchDialogElements.close_dialog_button).click({force: true})
    })

    after(function () {
      cy.logoutUI()
    })



    it('Test 1 - Verify Type dropdown field', () => {
      cy.get(AddNewCustomerDialogElements.customer_type_input).within(()=>{
        cy.contains("Individual")
        cy.contains("Company")
      });
    })

    it('Test 2 - Validate Type field selected as Individual', () => {
        cy.get(AddNewCustomerDialogElements.customer_type_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customer_type_input).select(individualType)
        cy.get(AddNewCustomerDialogElements.first_name_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.last_name_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.company_name_input).should('not.be.visible')
    })

    it('Test 3 - Validate Type field selected as Company', () => {
        cy.get(AddNewCustomerDialogElements.customer_type_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customer_type_input).select(companyType)
        cy.get(AddNewCustomerDialogElements.first_name_input).should('not.be.visible')
        cy.get(AddNewCustomerDialogElements.last_name_input).should('not.be.visible')
        cy.get(AddNewCustomerDialogElements.company_name_input).should('be.visible')
    })

    it('Test 4 - Verify Source dropdown field', () => {
      cy.get(AddNewCustomerDialogElements.source_type_input).within(()=>{
        cy.contains("Showroom")
        cy.contains("Phone")
        // cy.contains("Campaign")
      });
    })

    it('Test 5 - Verify Cancel and Add Customer Buttons in Add New Customer form', () => {
      cy.get(SalesHomeElements.add_new_customer_dialog).within(()=>{
        cy.contains(AddNewCustomerDialogElements.cancel_button)
        cy.contains(AddNewCustomerDialogElements.add_new_customer_button)
      })
    })

    it('Test 6 - Validate default Salespeople assign to the Customer', () => {
      cy.get(SalesHomeElements.add_new_customer_dialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.sales_people_div).within(()=>{
            cy.get(AddNewCustomerDialogElements.sales_people_list_div).first().within(() => {
                cy.get(AddNewCustomerDialogElements.sales_people_profile_div).should('be.visible')
            })
          })
      })
    })

    it('Test 7 - Remove salespeople which assigned', () => {
      cy.get(SalesHomeElements.add_new_customer_dialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.sales_people_div).within(()=>{
            cy.get(AddNewCustomerDialogElements.sales_people_list_div).first().within(() => {
                cy.get(AddNewCustomerDialogElements.sales_people_profile_div).click()
            })
            cy.wait(4000)
            cy.get(AddNewCustomerDialogElements.sales_people_list_div).first().children().last().within(() => {
                cy.get(AddNewCustomerDialogElements.sales_person_remove_button).click()
            })
            cy.wait(4000)
            cy.get(AddNewCustomerDialogElements.sales_people_list_div).first().within(() => {
                cy.get(AddNewCustomerDialogElements.sales_people_profile_div).should('not.be.visible')
            })
          })
      })
    })


    it('Test 8 - Add salespeople to the Customer', () => {
      cy.get(SalesHomeElements.add_new_customer_dialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.sales_people_div).within(()=>{
            cy.get(AddNewCustomerDialogElements.sales_people_add_new_list_div)
            .each(($el, index, $list) => {
                cy.wrap($el).click()
                cy.wrap($el).within(() => {
                    cy.get(AddNewCustomerDialogElements.add_sales_person_input).should('be.visible')
                    cy.get(AddNewCustomerDialogElements.add_sales_person_input).clear()
                    cy.get(AddNewCustomerDialogElements.add_sales_person_input).type('big')
                    // To be replaced with respective api call
                    cy.wait(4000)
                    cy.get(AddNewCustomerDialogElements.add_sales_persons_list_li_div).first().click()
                })
              })
            cy.get(AddNewCustomerDialogElements.sales_people_list_div)
                .each(($el, index, $list) => {
                cy.wrap($el).should('not.have.class', 'addNew')
              })


            //Remove assigned sales poeople
            cy.get(AddNewCustomerDialogElements.sales_people_list_div)
            .each(($el, index, $list) => {
                cy.wrap($el).click()
                cy.wrap($el).children().last().within(() => {
                    cy.get(AddNewCustomerDialogElements.sales_person_remove_button).click()
                })
              })
          })
      })
    })


    it('Test 9 - Search Existing salespeople in that store', () => {
      cy.get(SalesHomeElements.add_new_customer_dialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.sales_people_div).within(()=>{
            cy.get(AddNewCustomerDialogElements.sales_people_add_new_list_div).first().click()
            cy.get(AddNewCustomerDialogElements.sales_people_add_new_list_div).first().within(() => {
                cy.get(AddNewCustomerDialogElements.add_sales_person_input).should('be.visible')
                cy.get(AddNewCustomerDialogElements.add_sales_person_input).clear()
                cy.get(AddNewCustomerDialogElements.add_sales_person_input).type('big')
                cy.wait(4000)
                cy.get(AddNewCustomerDialogElements.add_sales_persons_list_li_div).first().contains('Big Daddy')
            })
          })
      })
    })

    it('Test 10 - Search NOT Existing salespeople in that store', () => {
      cy.get(SalesHomeElements.add_new_customer_dialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.sales_people_div).within(()=>{
            cy.get(AddNewCustomerDialogElements.sales_people_add_new_list_div).first().click()
            cy.get(AddNewCustomerDialogElements.sales_people_add_new_list_div).first().within(() => {
                cy.get(AddNewCustomerDialogElements.add_sales_person_input).should('be.visible')
                cy.get(AddNewCustomerDialogElements.add_sales_person_input).clear()
                cy.get(AddNewCustomerDialogElements.add_sales_person_input).type('abcdefgh')
                cy.wait(4000)
                cy.get(AddNewCustomerDialogElements.add_sales_persons_list_li_div).contains('No Results Found')
            })
          })
      })
    })


    it('Test 11 - Search Existing BDC in that store', () => {
      cy.get(SalesHomeElements.add_new_customer_dialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.bdc_div).within(()=>{
            cy.get(AddNewCustomerDialogElements.bdc_add_new_list_div).first().click()
            cy.get(AddNewCustomerDialogElements.bdc_add_new_list_div).first().within(() => {
                cy.get(AddNewCustomerDialogElements.add_bdc_input).should('be.visible')
                cy.get(AddNewCustomerDialogElements.add_bdc_input).clear()
                cy.get(AddNewCustomerDialogElements.add_bdc_input).type('big')
                cy.wait(4000)
                cy.get(AddNewCustomerDialogElements.add_bdc_list_li_div).first().contains('Big Daddy')
            })
          })
      })
    })

    it('Test 12 - Search NOT Existing BDC in that store', () => {
      cy.get(SalesHomeElements.add_new_customer_dialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.bdc_div).within(()=>{
            cy.get(AddNewCustomerDialogElements.bdc_add_new_list_div).first().click()
            cy.get(AddNewCustomerDialogElements.bdc_add_new_list_div).first().within(() => {
                cy.get(AddNewCustomerDialogElements.add_bdc_input).should('be.visible')
                cy.get(AddNewCustomerDialogElements.add_bdc_input).clear()
                cy.get(AddNewCustomerDialogElements.add_bdc_input).type('abcdefgh')
                cy.wait(4000)
                cy.get(AddNewCustomerDialogElements.add_bdc_list_li_div).first().contains('No Results Found')
            })
          })
      })
    })


    it('Test 13 - Add And Remove BDC to the Customer', () => {
      cy.get(SalesHomeElements.add_new_customer_dialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.bdc_div).within(()=>{
            cy.get(AddNewCustomerDialogElements.bdc_add_new_list_div)
            .each(($el, index, $list) => {
                cy.wrap($el).click()
                cy.wrap($el).within(() => {
                    cy.get(AddNewCustomerDialogElements.add_bdc_input).should('be.visible')
                    cy.get(AddNewCustomerDialogElements.add_bdc_input).clear()
                    cy.get(AddNewCustomerDialogElements.add_bdc_input).type('big')
                    // To be replaced with respective api call
                    cy.wait(4000)
                    cy.get(AddNewCustomerDialogElements.add_bdc_list_li_div).first().click()
                })
              })
            cy.get(AddNewCustomerDialogElements.bdc_list_div)
                .each(($el, index, $list) => {
                if($el.is(':visible')){
                    cy.wrap($el).should('not.have.class', 'addNew')
                }
              })
            cy.get(AddNewCustomerDialogElements.bdc_list_div)
            .each(($el, index, $list) => {
                cy.wrap($el).click()
                cy.wrap($el).children().last().within(() => {
                    cy.get(AddNewCustomerDialogElements.bdc_remove_button).click()
                })
              })
            cy.get(AddNewCustomerDialogElements.bdc_list_div)
                .each(($el, index, $list) => {
                if($el.is(':visible')){
                    cy.wrap($el).should('have.class', 'addNew')
                }
              })
          })
      })
    })



    it('Test 14 - Add Interested Vehicle by Inventory', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
        cy.get(AddNewCustomerDialogElements.new_vehicle_buttons_list).first().click()
      })
      cy.get(AddNewCustomerDialogElements.add_new_vehicle_inventory_dialog).within(() => {
        cy.contains("Year").click()
        cy.get(".driveInventoryFiltersBody.active ul li").first().click()
        cy.get('.driveInventoryBodyListing ul li button:not([disabled])').first().click()
      })
      cy.get('.driveNewCustomerVehicleInterested .dealVehicleActions').click({ force: true })
    })

    it('Test 16 - Add Interested Vehicle by Custom', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
        cy.contains('Add Custom').click()
      })
      cy.get('.driveCustomInventory .driveCustomInventoryStatus select').select('New')
      cy.get('.driveCustomInventory .driveCustomInventoryYear input').type('2019')
      cy.get('.driveCustomInventory .driveCustomInventoryMake input').type('Honda')
      cy.get('.driveCustomInventory .driveCustomInventoryModel input').type('City')
      cy.get('.driveCustomInventory .driveCustomInventoryTrim input').type('TestTrim')
      cy.get('.driveCustomInventory .driveCustomInventoryStock input').type('2')
      cy.get('.driveCustomInventory .driveCustomInventoryVin input').type('2')
      cy.get('.driveCustomInventory .driveCustomInventoryMileage input').type('12')
      cy.get('.driveCustomInventory .driveCustomInventoryPrice input').type('2000')
      cy.get('.driveCustomInventory .driveCustomInventoryACV input').type('2000')
      cy.get('.driveCustomInventory .driveCustomInventoryInterior input').type('Black')
      cy.get('.driveCustomInventory .driveCustomInventoryExterior input').type('Black')
      cy.get('.driveCustomInventoryDialog .driveDialogActions').within(()=>{
        cy.contains('Add').click()
      })
      cy.get('.driveNewCustomerVehicleInterested .dealVehicleActions').click({ force: true })
    })
    
	it('Test 17 - Verify Interested Vehicle Button', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
        cy.contains('Add Custom').should('be.visible')
		cy.contains('Add Inventory').should('be.visible')		
      })
      
    })
	
	it('Test 18 - Verify Add Inventory Page Fields', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
		cy.contains('Add Inventory').click()		
      })
	 
	  cy.get(AddNewCustomerDialogElements.add_inventory_dialog_options).should('be.visible').then(function($lis){
		  expect($lis).to.have.length(7)
          expect($lis.eq(0)).to.contain('Enterprise')
		  expect($lis.eq(1)).to.contain('Year')
		  expect($lis.eq(2)).to.contain('Make')
		  expect($lis.eq(3)).to.contain('Model')
		  expect($lis.eq(4)).to.contain('Trim')
		  expect($lis.eq(5)).to.contain('Color')
		  expect($lis.eq(6)).to.contain('New/Used')
        })
		cy.contains('Add a tag').should('be.visible')
    })
	
  });

})
