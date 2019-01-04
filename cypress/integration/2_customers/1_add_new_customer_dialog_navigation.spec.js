
//Need to remove .wait from all places. Right now we don't have good way of element finding,
//once data-test tags implemented we can remove
//all .within() in turn we can just remove .wait

import * as AddNewCustomerDialogElements from './../../HTMLElementSelectors/AddNewCustomerDialog.json';
import * as SalesHomeElements from './../../HTMLElementSelectors/SalesHome.json';
import * as CustomerSearchDialogElements from './../../HTMLElementSelectors/CustomerSearchDialog.json';

const customer = {
    "firstName": "Appointment",
    "lastName": "One",
    "email": "testEmail@test.com",
    "phone": "9999999999",
    "companyName": "Test Company"
  }

const individualType = "Individual";
const companyType = "Company";

const sourceTypeRequiredText = 'Please select a source type'
const sourceDestRequiredText = 'Please select a source description'

const noVehicleSelectedConfirmationText = 'No interested vehicle has been selected'
const confirmDialogCancelText = "NO"


const confirmationDialogClass = '.driveDialogAlert';
const customerInterestedInventoryAddDiv = '.driveNewCustomerVehicleInterested .add'

const interestedVehicleOption = '.driveNewCustomerVehicleInterested .srNewContent'

const closeInterestedVehicleOptionsButton = '.srContentCustomerClose'
const addInventoryButton = 'Add Inventory'
const addCustomeInventoryButton = 'Add Custom'



context('Customer', () => {

  describe('All Perms User - Add New Customer Dialog Navigation', () => {

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



    it('Test 1 - Check Add Customer Dialog Visibility', () => {
      cy.get(SalesHomeElements.addNewCustomerButton).click()
      cy.get(CustomerSearchDialogElements.firstNameInput).clear()
      cy.get(CustomerSearchDialogElements.firstNameInput).type(customer.firstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.addCustomerButton).click()
        cy.get(SalesHomeElements.addNewCustomerDialog).should('be.visible')
      })
    })

    it('Test 2 - Verify Add New Customer form fields', () => {

        cy.get(AddNewCustomerDialogElements.customerTypeInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customerTypeInput).select(individualType)
        cy.get(AddNewCustomerDialogElements.firstNameInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.lastNameInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.companyNameInput).should('not.be.visible')
        cy.get(AddNewCustomerDialogElements.emailInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.phoneInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.homePhoneInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.addressInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.cityInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.stateInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.zipInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.storeInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.sourceTypeInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.sourceDescriptionInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.salesPeopleDiv).should('be.visible')
        cy.get(AddNewCustomerDialogElements.bdcDiv).should('be.visible')
        cy.get(AddNewCustomerDialogElements.interestedVehiclesDiv).should('be.visible')
        cy.get(AddNewCustomerDialogElements.tradeInDiv).should('be.visible')

        cy.get(AddNewCustomerDialogElements.customerTypeInput).select(companyType)
        cy.get(AddNewCustomerDialogElements.firstNameInput).should('not.be.visible')
        cy.get(AddNewCustomerDialogElements.lastNameInput).should('not.be.visible')
        cy.get(AddNewCustomerDialogElements.companyNameInput).should('be.visible')

    })

    it('Test 3 - Verify Type dropdown field', () => {
      cy.get(AddNewCustomerDialogElements.customerTypeInput).within(()=>{
        cy.contains("Individual")
        cy.contains("Company")
      });
    })

    it('Test 4 - Validate Type field selected as Individual', () => {

        cy.get(AddNewCustomerDialogElements.customerTypeInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customerTypeInput).select(individualType)
        cy.get(AddNewCustomerDialogElements.firstNameInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.lastNameInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.companyNameInput).should('not.be.visible')

    })


    it('Test 5 - Verify Type field value, if user enters first name and last name in Add new customer serch window.', () => {
      cy.get(SalesHomeElements.addNewCustomerDialog).within(()=>{
        cy.contains(AddNewCustomerDialogElements.cancelButton).click()
      })
      //Need to remove .wait
      cy.wait(4000)
      cy.get(CustomerSearchDialogElements.firstNameInput).clear()
      cy.get(CustomerSearchDialogElements.firstNameInput).type(customer.firstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.addCustomerButton).click()
        cy.get(SalesHomeElements.addNewCustomerDialog).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customerTypeInput).find(':selected').contains(individualType)
      })
    })

    it('Test 6 - Verify Type field value, if user enters Company Name in Add new customer serch window.', () => {
      cy.get(SalesHomeElements.addNewCustomerDialog).within(()=>{
        cy.contains(AddNewCustomerDialogElements.cancelButton).click()
      })
      cy.get(CustomerSearchDialogElements.firstNameInput).clear()
      cy.get(CustomerSearchDialogElements.companyInput).clear()
      cy.get(CustomerSearchDialogElements.companyInput).type(customer.companyName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.addCustomerButton).click()
        cy.get(SalesHomeElements.addNewCustomerDialog).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customerTypeInput).find(':selected').contains(companyType)
      })
    })

    it('Test 7 - Validate Type field selected as Company', () => {

        cy.get(AddNewCustomerDialogElements.customerTypeInput).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customerTypeInput).select(companyType)
        cy.get(AddNewCustomerDialogElements.firstNameInput).should('not.be.visible')
        cy.get(AddNewCustomerDialogElements.lastNameInput).should('not.be.visible')
        cy.get(AddNewCustomerDialogElements.companyNameInput).should('be.visible')

    })

    it('Test 8 - Verify Source dropdown field', () => {
      cy.get(AddNewCustomerDialogElements.sourceTypeInput).within(()=>{
        cy.contains("Showroom")
        cy.contains("Phone")
        // cy.contains("Campaign")
      });
    })

    it('Test 9 - Verify Cancel and Add Customer Buttons in Add New Customer form', () => {
      cy.get(SalesHomeElements.addNewCustomerDialog).within(()=>{
        cy.contains(AddNewCustomerDialogElements.cancelButton)
        cy.contains(AddNewCustomerDialogElements.addNewCustomerButton)
      })
    })

    it('Test 10 - Validate default Salespeople assign to the Customer', () => {
      cy.get(SalesHomeElements.addNewCustomerDialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.salesPeopleDiv).within(()=>{
            cy.get(AddNewCustomerDialogElements.salesPeopleListDiv).first().within(() => {
                cy.get(AddNewCustomerDialogElements.salesPeopleProfileDiv).should('be.visible')
            })
          })
      })
    })

    it('Test 11 - Remove salespeople which assigned', () => {
      cy.get(SalesHomeElements.addNewCustomerDialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.salesPeopleDiv).within(()=>{
            cy.get(AddNewCustomerDialogElements.salesPeopleListDiv).first().within(() => {
                cy.get(AddNewCustomerDialogElements.salesPeopleProfileDiv).click()
            })
            cy.wait(4000)
            cy.get(AddNewCustomerDialogElements.salesPeopleListDiv).first().children().last().within(() => {
                cy.get(AddNewCustomerDialogElements.salesPersonRemoveButton).click()
            })
            cy.wait(4000)
            cy.get(AddNewCustomerDialogElements.salesPeopleListDiv).first().within(() => {
                cy.get(AddNewCustomerDialogElements.salesPeopleProfileDiv).should('not.be.visible')
            })
          })
      })
    })


    it('Test 12 - Add salespeople to the Customer', () => {
      cy.get(SalesHomeElements.addNewCustomerDialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.salesPeopleDiv).within(()=>{
            cy.get(AddNewCustomerDialogElements.salesPeopleAddNewListDiv)
            .each(($el, index, $list) => {
                cy.wrap($el).click()
                cy.wrap($el).within(() => {
                    cy.get(AddNewCustomerDialogElements.addSalesPersonInput).should('be.visible')
                    cy.get(AddNewCustomerDialogElements.addSalesPersonInput).clear()
                    cy.get(AddNewCustomerDialogElements.addSalesPersonInput).type('big')
                    // To be replaced with respective api call
                    cy.wait(4000)
                    cy.get(AddNewCustomerDialogElements.addSalesPersonsListLiDiv).first().click()
                })
              })
            cy.get(AddNewCustomerDialogElements.salesPeopleListDiv)
                .each(($el, index, $list) => {
                cy.wrap($el).should('not.have.class', 'addNew')
              })


            //Remove assigned sales poeople
            cy.get(AddNewCustomerDialogElements.salesPeopleListDiv)
            .each(($el, index, $list) => {
                cy.wrap($el).click()
                cy.wrap($el).children().last().within(() => {
                    cy.get(AddNewCustomerDialogElements.salesPersonRemoveButton).click()
                })
              })
          })
      })
    })


    it('Test 13 - Search Existing salespeople in that store', () => {
      cy.get(SalesHomeElements.addNewCustomerDialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.salesPeopleDiv).within(()=>{
            cy.get(AddNewCustomerDialogElements.salesPeopleAddNewListDiv).first().click()
            cy.get(AddNewCustomerDialogElements.salesPeopleAddNewListDiv).first().within(() => {
                cy.get(AddNewCustomerDialogElements.addSalesPersonInput).should('be.visible')
                cy.get(AddNewCustomerDialogElements.addSalesPersonInput).clear()
                cy.get(AddNewCustomerDialogElements.addSalesPersonInput).type('big')
                cy.wait(4000)
                cy.get(AddNewCustomerDialogElements.addSalesPersonsListLiDiv).first().contains('Big Daddy')
            })
          })
      })
    })

    it('Test 14 - Search NOT Existing salespeople in that store', () => {
      cy.get(SalesHomeElements.addNewCustomerDialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.salesPeopleDiv).within(()=>{
            cy.get(AddNewCustomerDialogElements.salesPeopleAddNewListDiv).first().click()
            cy.get(AddNewCustomerDialogElements.salesPeopleAddNewListDiv).first().within(() => {
                cy.get(AddNewCustomerDialogElements.addSalesPersonInput).should('be.visible')
                cy.get(AddNewCustomerDialogElements.addSalesPersonInput).clear()
                cy.get(AddNewCustomerDialogElements.addSalesPersonInput).type('abcdefgh')
                cy.wait(4000)
                cy.get(AddNewCustomerDialogElements.addSalesPersonsListLiDiv).contains('No Results Found')
            })
          })
      })
    })


    it('Test 15 - Search Existing BDC in that store', () => {
      cy.get(SalesHomeElements.addNewCustomerDialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.bdcDiv).within(()=>{
            cy.get(AddNewCustomerDialogElements.bdcAddNewListDiv).first().click()
            cy.get(AddNewCustomerDialogElements.bdcAddNewListDiv).first().within(() => {
                cy.get(AddNewCustomerDialogElements.addBDCInput).should('be.visible')
                cy.get(AddNewCustomerDialogElements.addBDCInput).clear()
                cy.get(AddNewCustomerDialogElements.addBDCInput).type('big')
                cy.wait(4000)
                cy.get(AddNewCustomerDialogElements.addBDCListLiDiv).first().contains('Big Daddy')
            })
            cy.wait(4000)
            cy.get(AddNewCustomerDialogElements.bdcAddNewListDiv).first().within(() => {
                cy.get(AddNewCustomerDialogElements.bdcCloseButton).first().click()
            })
          })
      })
    })

    it('Test 14 - Search NOT Existing BDC in that store', () => {
      cy.get(SalesHomeElements.addNewCustomerDialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.bdcDiv).within(()=>{
            cy.get(AddNewCustomerDialogElements.bdcAddNewListDiv).first().click()
            cy.get(AddNewCustomerDialogElements.bdcAddNewListDiv).first().within(() => {
                cy.get(AddNewCustomerDialogElements.addBDCInput).should('be.visible')
                cy.get(AddNewCustomerDialogElements.addBDCInput).clear()
                cy.get(AddNewCustomerDialogElements.addBDCInput).type('abcdefgh')
                cy.wait(4000)
                cy.get(AddNewCustomerDialogElements.addBDCListLiDiv).first().contains('No Results Found')
                cy.get(AddNewCustomerDialogElements.bdcCloseButton).first().click()
            })
          })
      })
    })


    it('Test 15 - Add BDC to the Customer', () => {
      cy.get(SalesHomeElements.addNewCustomerDialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.bdcDiv).within(()=>{
            cy.get(AddNewCustomerDialogElements.bdcAddNewListDiv)
            .each(($el, index, $list) => {
                cy.wrap($el).click()
                cy.wrap($el).within(() => {
                    cy.get(AddNewCustomerDialogElements.addBDCInput).should('be.visible')
                    cy.get(AddNewCustomerDialogElements.addBDCInput).clear()
                    cy.get(AddNewCustomerDialogElements.addBDCInput).type('big')
                    // To be replaced with respective api call
                    cy.wait(4000)
                    cy.get(AddNewCustomerDialogElements.addBDCListLiDiv).first().click()
                })
              })
            cy.get(AddNewCustomerDialogElements.bdcListDiv)
                .each(($el, index, $list) => {
                if($el.is(':visible')){
                    cy.wrap($el).should('not.have.class', 'addNew')
                }
              })
          })
      })
    })


    it('Test 16 - Remove BDC which assigned to Customer', () => {
      cy.get(SalesHomeElements.addNewCustomerDialog).within(()=>{
        cy.get(AddNewCustomerDialogElements.bdcDiv).within(()=>{
            cy.get(AddNewCustomerDialogElements.bdcListDiv)
            .each(($el, index, $list) => {
                cy.wrap($el).click()
                cy.wrap($el).children().last().within(() => {
                    cy.get(AddNewCustomerDialogElements.bdcRemoveButton).click()
                })
              })
            cy.get(AddNewCustomerDialogElements.bdcListDiv)
                .each(($el, index, $list) => {
                if($el.is(':visible')){
                    cy.wrap($el).should('have.class', 'addNew')
                }
              })
          })
      })
    })



    // it('Test 2 - Required Fields Check', () => {
    //   cy.get(addNewCustomerButton).click()
    //   cy.server()
    //   cy.route({
    //     method: 'POST',
    //     url: '/api/legacy',
    //   }).as('legacy')
         //cy.get(searchFirstNameTextBox).clear()
    //   cy.get(searchFirstNameTextBox).type(testFirstName)
    //   cy.wait('@legacy').then((xhr) => {
    //     cy.contains(searchAddCustFromScratchText)
    //     cy.contains(addCustomerButton).click()
    //     cy.get(addNewCustomerDialog).should('be.visible')

    //     //Source Type Required
    //     cy.get(addNewCustomerDialog).contains(addNewCustDialogAddCustButton).click()
    //     cy.get(alertDialog).should('be.visible')
    //     cy.get(alertDialog).contains(sourceTypeRequiredText)

    //     cy.get(alertDialogDone).click()
    //     cy.get(addNewCustDialogSourceType).select(testSourceType)

    //     //Source Destination Required
    //     cy.get(addNewCustomerDialog).contains(addNewCustDialogAddCustButton).click()
    //     cy.get(alertDialog).should('be.visible')
    //     cy.get(alertDialog).contains(sourceDestRequiredText)

    //     cy.get(alertDialogDone).click()
    //     cy.get(addNewCustDialogSourceDesc).select(testSourceDesc)

    //     //Interested Vehicle Confirmation
    //     cy.get(addNewCustomerDialog).contains(addNewCustDialogAddCustButton).click()
    //     cy.get(confirmationDialogClass).should('be.visible')
    //     cy.get(confirmationDialogClass).contains(noVehicleSelectedConfirmationText)

    //     cy.get(confirmationDialogClass).contains(confirmDialogCancelText).click()

    //     //Adding New Inventory
    //     cy.get(customerInterestedInventoryAddDiv).click()
    //     cy.get(interestedVehicleOption).contains(addInventoryButton)

    //     cy.get(interestedVehicleOption).get(closeInterestedVehicleOptionsButton).click()
    //     cy.get(interestedVehicleOption).contains(addInventoryButton).should('be.hidden')

    //     //Open Existing Inventory Dialog
    //     cy.get(customerInterestedInventoryAddDiv).click()
    //     cy.get(interestedVehicleOption).contains(addInventoryButton).click()

    //   })
    // })

    // it('Test 10 - Check Individual Values entered in search dialog with Add New Customer dialog', () => {
    //   cy.get(SalesHomeElements.addNewCustomerButton).click()
    //   cy.server()
    //   cy.route({
    //     method: 'POST',
    //     url: '/api/legacy',
    //   }).as('legacy')
    //   cy.get(CustomerSearchDialogElements.firstNameInput).clear()
    //   cy.get(CustomerSearchDialogElements.firstNameInput).type(customer.firstName)
    //   cy.get(CustomerSearchDialogElements.lastNameInput).clear()
    //   cy.get(CustomerSearchDialogElements.lastNameInput).type(customer.lastName)
    //   cy.get(CustomerSearchDialogElements.phoneInput).clear()
    //   cy.get(CustomerSearchDialogElements.phoneInput).type(customer.phone)
    //   cy.get(CustomerSearchDialogElements.emailInput).clear()
    //   cy.get(CustomerSearchDialogElements.emailInput).type(customer.email)
    //   cy.wait('@legacy').then((xhr) => {
    //     cy.contains(CustomerSearchDialogElements.addCustomerButton).click()
    //     cy.get(SalesHomeElements.addNewCustomerDialog).should('be.visible')
    //     cy.get(SalesHomeElements.customerTypeInput).find(':selected').contains(individualType)
    //     cy.get(AddNewCustomerDialogElements.firstNameInput).should('have.value', customer.firstName)
    //     cy.get(AddNewCustomerDialogElements.lastNameInput).should('have.value', customer.lastName)
    //     cy.get(AddNewCustomerDialogElements.emailInput).should('have.value', customer.email)
    //     cy.get(AddNewCustomerDialogElements.phoneInput).should('have.value', customer.phone)
    //   })
    // })

    // it('Test 11 - Check Individual Values entered in search dialog with Add New Customer dialog', () => {
    //   cy.get(SalesHomeElements.addNewCustomerButton).click()
    //   cy.server()
    //   cy.route({
    //     method: 'POST',
    //     url: '/api/legacy',
    //   }).as('legacy')
    //   cy.get(CustomerSearchDialogElements.companyInput).clear()
    //   cy.get(CustomerSearchDialogElements.companyInput).type(customer.companyName)
    //   cy.get(CustomerSearchDialogElements.phoneInput).clear()
    //   cy.get(CustomerSearchDialogElements.phoneInput).type(customer.phone)
    //   cy.get(CustomerSearchDialogElements.emailInput).clear()
    //   cy.get(CustomerSearchDialogElements.emailInput).type(customer.email)
    //   cy.wait('@legacy').then((xhr) => {
    //     cy.contains(CustomerSearchDialogElements.addCustomerButton).click()
    //     cy.get(SalesHomeElements.addNewCustomerDialog).should('be.visible')
    //     cy.get(SalesHomeElements.customerTypeInput).find(':selected').contains(companyType)
    //     cy.get(AddNewCustomerDialogElements.companyNameInput).should('have.value', customer.companyName)
    //     cy.get(AddNewCustomerDialogElements.emailInput).should('have.value', customer.email)
    //     cy.get(AddNewCustomerDialogElements.phoneInput).should('have.value', customer.phone)
    //   })
    // })

  })

})
