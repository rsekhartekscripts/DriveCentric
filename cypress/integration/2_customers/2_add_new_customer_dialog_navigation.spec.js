
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
	
	it('Test 19 - Verify Filters in the Add Inventory Dialog and check selected vales are displayed in search tag', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
		cy.contains('Add Inventory').click()		
      })
	  //Wait for the Add Inventory dialog Options
	  cy.get(AddNewCustomerDialogElements.add_inventory_dialog_options).should('have.length', 7)
	  
	  //Click on the Year and then click the first values of Year
	  cy.get(AddNewCustomerDialogElements.add_inventory_dialog_options).eq(1).should('be.visible').contains('Year').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_year_list).first().should('be.visible').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_search_tags).should('be.visible')
	  
	  //Click on the Make and then click the first values of Make
	  cy.get(AddNewCustomerDialogElements.add_inventory_dialog_options).eq(2).should('be.visible').contains('Make').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_make_list).first().should('be.visible').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_search_tags).should('be.visible')
	  
	  //Click on the Model and then click the first values of Model
	  cy.get(AddNewCustomerDialogElements.add_inventory_dialog_options).eq(3).should('be.visible').contains('Model').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_model_list).first().should('be.visible').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_search_tags).should('be.visible')
	  
	  //Click on the Trim and then click the first values of Trim
	  cy.get(AddNewCustomerDialogElements.add_inventory_dialog_options).eq(4).should('be.visible').contains('Trim').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_trim_list).first().should('be.visible').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_search_tags).should('be.visible')
	  
	  //Click on the Color and then click the first values of Color
	  cy.get(AddNewCustomerDialogElements.add_inventory_dialog_options).eq(5).should('be.visible').contains('Color').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_color_list).first().should('be.visible').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_search_tags).should('be.visible')
	  
	  //Click on the New/Used and then click the first values of New/Used
	  cy.get(AddNewCustomerDialogElements.add_inventory_dialog_options).eq(6).should('be.visible').contains('New/Used').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_newused_list).first().should('be.visible').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_search_tags).should('be.visible')
	  
	  //Verify Selected Values are dispalyed as a tags in the search bar
	  cy.get(AddNewCustomerDialogElements.add_inventory_search_tags).should('be.visible').then(function($lis){
		  expect($lis).to.have.length(6)
		  expect($lis.eq(0)).to.contain('Year')
		  expect($lis.eq(1)).to.contain('Make')
		  expect($lis.eq(2)).to.contain('Model')
		  expect($lis.eq(3)).to.contain('Trim')
		  expect($lis.eq(4)).to.contain('Color')
		  expect($lis.eq(5)).to.contain('New/Used')
        })
	 
    })
	
	it('Test 20 - Verify Add Interested Vehicle by Inventory', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
		cy.contains('Add Inventory').click()		
      })
	  //Wait for the Add Inventory dialog Options
	  cy.get(AddNewCustomerDialogElements.add_inventory_dialog_options).should('have.length', 7)
	  
	  //Click on the Year and then click the first values of Year
	  cy.get(AddNewCustomerDialogElements.add_inventory_dialog_options).eq(1).should('be.visible').contains('Year').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_year_list).first().should('be.visible').click()
	  cy.get(AddNewCustomerDialogElements.add_inventory_search_tags).should('be.visible')
	  
	  //Click on the add vehicle button of selected vehicle 
	  cy.get(AddNewCustomerDialogElements.add_vehicle_button).eq(0).should('be.visible').click()
	  
	  //Verify the selected vehicle under inventary
	   cy.get(AddNewCustomerDialogElements.added_vehicle_under_inventary).should('be.visible')
	  
    })
	
	it('Test 21 - Verify Text Fields in Custom vehicle window ', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
		cy.contains('Add Custom').click()		
      })
	  //Wait for the Add Custom dialog Options
	  cy.get(AddNewCustomerDialogElements.add_custom_dialog_fields).should('have.length', 14)
	  
	  //Verify Add Custom dialog fields
	  cy.get(AddNewCustomerDialogElements.add_custom_dialog_fields).should('be.visible').then(function($lis){
		  expect($lis).to.have.length(14)
		  expect($lis.eq(0)).to.contain('New/Used')
		  expect($lis.eq(1)).to.contain('Year')
		  expect($lis.eq(2)).to.contain('Make')
		  expect($lis.eq(3)).to.contain('Model')
		  expect($lis.eq(4)).to.contain('Trim')
		  expect($lis.eq(5)).to.contain('Stock #')
		  expect($lis.eq(6)).to.contain('VIN #')
		  expect($lis.eq(7)).to.contain('Mileage')
		  expect($lis.eq(8)).to.contain('Price')
		  expect($lis.eq(10)).to.contain('Cost')
		  expect($lis.eq(11)).to.contain('Interior Color')
		  expect($lis.eq(12)).to.contain('Exterior Color')
		   expect($lis.eq(13)).to.contain('Comments')
		  
        })
		//Click on the New/Used dropdown and Check the Options
		cy.get(AddNewCustomerDialogElements.new_used_dropdown_options).eq(1).should('have.text', 'New')
		cy.get(AddNewCustomerDialogElements.new_used_dropdown_options).eq(2).should('have.text', 'Used')
		
		//Verify Add and Cancel  button
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_buttons).eq(0).contains('Cancel')
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_buttons).eq(1).contains('Add')		
	  
    })
	
	it('Test 22 - Verify Text Fields in Custom vehicle window ', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
		cy.contains('Add Custom').click()		
      })
	  //Wait for the Add Custom dialog Options
	  cy.get(AddNewCustomerDialogElements.add_custom_dialog_fields).should('have.length', 14)
	  
		//Click on the New/Used dropdown and Check the Options
		cy.get(AddNewCustomerDialogElements.new_used_dropdown_options).eq(1).should('have.text', 'New')
		cy.get(AddNewCustomerDialogElements.new_used_dropdown_options).eq(2).should('have.text', 'Used')
		
		//Verify Add and Cancel  button
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_buttons).eq(0).contains('Cancel')
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_buttons).eq(1).contains('Add')
	  
    })	
	
	it('Test 23 - Validate VIN # field with the value given ', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
		cy.contains('Add Custom').click()		
      })
		 //Wait for the Add Custom dialog Options
		 cy.get(AddNewCustomerDialogElements.add_custom_dialog_fields).should('have.length', 14)
	  
		//Enter text in the VIN# field
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_vin_field).type(customer.existingvin)
		
		//Assert the displayed field values for Year, Mark, Model, Trim and VIN
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_vin_field).should('have.class', 'ng-modified')
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_vin_field).should('have.class', 'ng-modified')
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_vin_field).should('have.class', 'ng-modified')
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_vin_field).should('have.class', 'ng-modified')
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_vin_field).should('have.class', 'ng-modified')
		  
    })
	
	it('Test 24 - Validate CANCEL button in Add Vehicle window WITHOUT data ', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
		cy.contains('Add Custom').click()		
		})
		 //Wait for the Add Custom dialog Options
		 cy.get(AddNewCustomerDialogElements.add_custom_dialog_fields).should('have.length', 14)
	  
		//Click On CANCEL button
		cy.get(AddNewCustomerDialogElements.add_custom_dialog).within(()=>{
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_buttons).contains('Cancel').click()
        })	
	    cy.get(AddNewCustomerDialogElements.add_custom_dialog).should('not.exist')
		
    })
	
	it('Test 25 - Validate CANCEL button in Add Vehicle window WITH data ', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
		cy.contains('Add Custom').click()		
      })
		 //Wait for the Add Custom dialog Options
		 cy.get(AddNewCustomerDialogElements.add_custom_dialog_fields).should('have.length', 14)
	  
		//Enter text in the VIN# field
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_vin_field).type(customer.vin)
		  
		//Click On CANCEL button
		cy.get(AddNewCustomerDialogElements.add_custom_dialog).within(()=>{
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_buttons).contains('Cancel').click()
        })		
		
		//Verify the confirm alert present
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_confirm_alert).contains('You have unsaved changes, are you sure you wish to cancel those changes and close the dialog?')
    })
	
	it('Test 26 - Add Interested Vehicle by Custom type ', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
		cy.contains('Add Custom').click()		
      })
		 //Wait for the Add Custom dialog Options
		 cy.get(AddNewCustomerDialogElements.add_custom_dialog_fields).should('have.length', 14)
	  
		//Select New/Used dropdown value
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_newused_field).select(customer.new_used)
		
		//Enter text in the Year field
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_year_field).type(customer.year)
		
		//Enter text in the Make field
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_make_field).type(customer.make)
		
		//Enter text in the Model field
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_model_field).type(customer.model)
		
		//Enter text in the VIN# field
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_vin_field).type(customer.vin_new)
		
		//Enter text in the Cost field
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_cost_field).type(customer.cost)
		
		//Enter text in the external color
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_externalcolor_field).type(customer.color)
		  
		//Click On SAVE button
		cy.get(AddNewCustomerDialogElements.add_custom_dialog).within(()=>{
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_buttons).contains('Add').click()
        })	
		cy.wait(3000)
		
		//Verify the created vehicle under inventary
	   cy.get(AddNewCustomerDialogElements.added_vehicle_under_inventary).should('be.visible')
    })
	
	it('Test 27 - Remove Interested Vehicle from the list ', () => {
      cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()
		cy.contains('Add Custom').click()		
      })
		//Wait for the Add Custom dialog Options
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_fields).should('have.length', 14)
	  
		//Enter text in the VIN# field
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_vin_field).type(customer.vin_old)
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_externalcolor_field).click()
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_vin_field).should('have.class', 'ng-modified')
		  
		//Click On SAVE button
		cy.get(AddNewCustomerDialogElements.add_custom_dialog).within(()=>{
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_buttons).contains('Add').click()
        })	
		
		//Verify the created vehicle under inventary
	   cy.get(AddNewCustomerDialogElements.added_vehicle_under_inventary).should('be.visible')
	   cy.wait(3000)
	   //Click on Remove Interested Vehicle
	   cy.get(AddNewCustomerDialogElements.remove_vehicle_inventary).click({ force: true })
	   
	    cy.get(AddNewCustomerDialogElements.interested_vehicle_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).should('be.visible')
      })
	   
    })
	
	it('Test 28 - Verify Add Trade In window fields ', () => {
      cy.get(AddNewCustomerDialogElements.trade_in_div).within(()=>{
        cy.get(AddNewCustomerDialogElements.new_vehicle_add_button).click()	
      })
	  //Wait for the Trade-in dialog Options
	  cy.get(AddNewCustomerDialogElements.add_custom_dialog_fields).should('have.length', 18)
	  
	  //Verify Trade-in dialog fields
	  cy.get(AddNewCustomerDialogElements.add_custom_dialog_fields).should('be.visible').then(function($lis){
		  expect($lis).to.have.length(18)
		  expect($lis.eq(0)).to.contain('Year')
		  expect($lis.eq(1)).to.contain('Make')
		  expect($lis.eq(2)).to.contain('Model')
		  expect($lis.eq(3)).to.contain('Trim')
		  expect($lis.eq(4)).to.contain('Stock #')
		  expect($lis.eq(5)).to.contain('VIN #')
		  expect($lis.eq(6)).to.contain('Mileage')
		  expect($lis.eq(7)).to.contain('Allowance')
		  expect($lis.eq(8)).to.contain('Payoff')
		  expect($lis.eq(9)).to.contain('ACV')
		  expect($lis.eq(10)).to.contain('Interior Color')
		  expect($lis.eq(11)).to.contain('Exterior Color')
		  expect($lis.eq(12)).to.contain('Bank')
		  expect($lis.eq(13)).to.contain('Contact')
		  expect($lis.eq(14)).to.contain('Good Until')
		  expect($lis.eq(15)).to.contain('Account')
		  expect($lis.eq(16)).to.contain('Per Diem')
		  expect($lis.eq(17)).to.contain('Comments')
        })	   
		  
		//Verify Add and Cancel  button
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_buttons).eq(0).contains('Cancel')
		cy.get(AddNewCustomerDialogElements.add_custom_dialog_buttons).eq(1).contains('Add')
    })
	
  });

})
